import { In } from 'typeorm'
import { Rental } from '../entity/Rental'
import { BaseRepository } from './repository'
import { Product } from '../entity/Product'
import { RentedProduct } from '../entity/RentedProduct'
import { Client } from '../entity/Client'
import { DateHelper } from '../common/DateHelper'

interface ProductData {
    id: number,
    quantity    
}

interface RentedProductData {
    product: Product,
    product_quantity: number,
    daily_price: number
}

interface RentalCreationData {
    client_id: number,
    products: ProductData[],
    start_date: Date,
    end_date: Date
}

export class RentalRepository extends BaseRepository {
    _entity = Rental

    private readonly DAYS_UNTIL_ABOUT_TO_EXPIRE = 2

    public async findRentalsInArrears(page?: number, take?: number) {
        const builder = await this._entity.createQueryBuilder()
            .where('end_date < :date', { date: new Date })

        return await super.paginate({ page, take }, builder)
    }

    public async findRentalsOnTime(page?: number, take?: number) {
        const builder = await this._entity.createQueryBuilder()
            .where('end_date > :date', { date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })

        return await super.paginate({ page, take }, builder)
    }

    public async findRentalsAboutToExpire(page?: number, take?: number) {
        const builder = await this._entity.createQueryBuilder()
            .where('end_date > :initial_date', { initial_date: new Date })
            .andWhere('end_date < :final_date', { final_date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })

        return await super.paginate({ page, take }, builder)
    }

    private productsUnavailable(rentedProducts: RentedProductData[]): boolean {
        for (const rentedProduct of rentedProducts) {
            const product = rentedProduct.product

            if (product.quantity - rentedProduct.product_quantity < 0)
                return true
        }

        return false
    }

    private async getProducts(data: ProductData[]) : Promise<Product[]> {
        return await Product.findBy({
            id: In(data.map(p => p.id))
        })
    }

    private async getRentedProductsWithDailyPrice(data: ProductData[]) : Promise<RentedProductData[]> {
        const products = await this.getProducts(data)

        return data.map((p, index) => {
            return {
                product: products[index],
                product_quantity: p.quantity,
                daily_price: products[index].daily_price * p.quantity
            }
        })
    }

    private getTotalDailyPrice(rentedProducts: RentedProductData[]) {
        return rentedProducts.map(p => p.daily_price).reduce((a, b) => a + b, 0)
    }

    private async createRentedProductsEntities(rental: Rental, rentedProducts: RentedProduct[]) {
        rental.products = RentedProduct.create(rentedProducts as RentedProduct[])
        rental.products.forEach(product => product.rental = rental)

        await RentedProduct.save(rental.products)
    }

    private async decreaseProductsQuantity(rentedProducts: RentedProductData[]) {
        for (const rentedProduct of rentedProducts) {
            const product = rentedProduct.product

            product.quantity -= rentedProduct.product_quantity

            await product.save()
        }
    }

    public async create(data: RentalCreationData): Promise<Rental> {
        const rental = Rental.create(data)

        rental.client = await Client.findOneBy({ id: data.client_id })

        const rentedProductsWithDailyPrice : RentedProductData[] = await this.getRentedProductsWithDailyPrice(data.products)

        if (this.productsUnavailable(rentedProductsWithDailyPrice)) {
            // TODO: error handling
            return
        }

        rental.total_daily_price = this.getTotalDailyPrice(rentedProductsWithDailyPrice)

        await rental.save()
        
        await this.createRentedProductsEntities(rental, rentedProductsWithDailyPrice as RentedProduct[])

        await this.decreaseProductsQuantity(rentedProductsWithDailyPrice)

        return rental
    }

}