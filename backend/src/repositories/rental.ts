import { BaseEntity, In, MoreThan } from 'typeorm'
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

    public findRentalsInArrears(page?: number, take?: number) {
        const builder = this.createRentalSearchQuery()
            .where('end_date < :date', { date: new Date })
            .andWhere('completed = false')

        this.setBuilder(builder)

        return this
    }

    public findRentalsOnTime(page?: number, take?: number) {
        const builder = this.createRentalSearchQuery()
            .where('end_date > :date', { date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })
            .andWhere('completed = false')

        this.setBuilder(builder)
            
        return this
    }

    public findRentalsAboutToExpire(page?: number, take?: number) {
        const builder = this.createRentalSearchQuery()
            .where('end_date > :initial_date', { initial_date: new Date })
            .andWhere('end_date < :final_date', { final_date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })
            .andWhere('completed = false')

        this.setBuilder(builder)
            
        return this
    }

    private createRentalSearchQuery() {
        return this.getBuilder()
            .leftJoinAndSelect('entity.products', 'products')
            .leftJoinAndSelect('entity.client', 'client')
            .leftJoinAndSelect('products.product', 'product')
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

    public async receive(id: number) {
        const rental: Rental = await this.findOneBy({ id }) as Rental

        if (!rental)
            return

        rental.completed = true

        await rental.save()
    }

    public async create(data: RentalCreationData): Promise<Rental> {
        const rental = Rental.create(data)

        rental.client = await Client.findOneBy({ id: data.client_id })

        const rentedProductsWithDailyPrice : RentedProductData[] = await this.getRentedProductsWithDailyPrice(data.products)

        if (this.productsUnavailable(rentedProductsWithDailyPrice))
            throw new Error('Products don\'t have enough quantity for this rental.')

        rental.total_daily_price = this.getTotalDailyPrice(rentedProductsWithDailyPrice)

        await rental.save()

        await this.decreaseProductsQuantity(rentedProductsWithDailyPrice)
        
        await this.createRentedProductsEntities(rental, rentedProductsWithDailyPrice as RentedProduct[])

        return rental
    }

}