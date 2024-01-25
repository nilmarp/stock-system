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

interface RentalCreationData {
    client_id: number,
    products: ProductData[],
    start_date: Date,
    end_date: Date
}

export class RentalRepository extends BaseRepository {
    _entity = Rental

    private readonly DAYS_UNTIL_ABOUT_TO_EXPIRE = 2

    private productsUnavailable(products: Product[]): boolean {
        for (const product of products)
            if (product.quantity <= 0)
                return true

        return false
    }

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
            .where('end_date > :inicial_date', { inicial_date: new Date })
            .andWhere('end_date < :final_date', { final_date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })

        return await super.paginate({ page, take }, builder)
    }

    public async create(data: RentalCreationData): Promise<Rental> {
        const rental = Rental.create(data)

        rental.client = await Client.findOneBy({ id: data.client_id })
    
        const products = await Product.findBy({
            id: In(data.products.map(p => p.id))
        })

        if (this.productsUnavailable(products)) {
            // TODO: error handling
            return
        }

        const rentedProductsWithDailyPrice = data.products.map((p, index) => {
            return {
                product: Object.assign(new Product, { id: p.id }),
                product_quantity: p.quantity,
                daily_price: products[index].daily_price * p.quantity
            }
        })

        rental.total_daily_price = rentedProductsWithDailyPrice.map(p => p.daily_price).reduce((a, b) => a + b, 0)

        await rental.save()

        rental.products = RentedProduct.create(rentedProductsWithDailyPrice as RentedProduct[])
        rental.products.forEach(product => product.rental = rental)
    
        await RentedProduct.save(rental.products)

        return rental
    }

}
