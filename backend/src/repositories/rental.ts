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
    end_date: Date,
    discount_value: number,
}

export class RentalRepository extends BaseRepository {
    _entity = Rental

    private readonly DAYS_UNTIL_ABOUT_TO_EXPIRE = 2

    public findRentalsInArrears() {
        const builder = this.createRentalSearchQuery()
            .where('end_date < :date', { date: new Date })
            .andWhere('completed = false')

        this.setBuilder(builder)

        return this
    }

    public findRentalsOnTime() {
        const builder = this.createRentalSearchQuery()
            .where('end_date > :date', { date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })
            .andWhere('completed = false')

        this.setBuilder(builder)

        return this
    }

    public findRentalsAboutToExpire() {
        const builder = this.createRentalSearchQuery()
            .where('end_date > :initial_date', { initial_date: new Date })
            .andWhere('end_date < :final_date', { final_date: new DateHelper(new Date).addDays(this.DAYS_UNTIL_ABOUT_TO_EXPIRE).get() })
            .andWhere('completed = false')

        this.setBuilder(builder)

        return this
    }

    public findCompletedRentals() {
        const builder = this.createCompletedRentalSearchQuery()

        this.setBuilder(builder)

        return this
    }

    public findCompletedRentalsWithinDates(startDate: Date, finalDate: Date) {
        const builder = this.createCompletedRentalSearchQuery()
            .where('end_date > :start_date', { start_date: startDate })
            .andWhere('end_date < :final_date', { final_date: finalDate })

        this.setBuilder(builder)

        return this
    }

    private createCompletedRentalSearchQuery() {
        return this.createRentalSearchQuery()
            .where('completed = true')
    }

    private createRentalSearchQuery() {
        return this.getBuilder()
            .withDeleted()
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

    private async getProducts(data: ProductData[]): Promise<Product[]> {
        return await Product.findBy({
            id: In(data.map(p => p.id))
        })
    }

    private async getRentedProductsWithDailyPrice(data: ProductData[]): Promise<RentedProductData[]> {
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

    private async increaseProductsQuantity(rentedProducts: RentedProductData[] | RentedProduct[]) {
        for (const rentedProduct of rentedProducts) {
            const product = rentedProduct.product

            product.quantity += rentedProduct.product_quantity

            await product.save()
        }
    }

    private async decreaseProductsQuantity(rentedProducts: RentedProductData[] | RentedProduct[]) {
        for (const rentedProduct of rentedProducts) {
            const product = rentedProduct.product

            product.quantity -= rentedProduct.product_quantity

            await product.save()
        }
    }

    private removeCircularLinksFromRental(rental: Rental) {
        rental.products.forEach(product => delete product.rental)
    }

    public async receive(id: number, discount_price: number) {
        const rental: Rental = await this.createRentalSearchQuery()
            .andWhere('entity.id = :id', { id })
            .getOne() as Rental

        if (!rental){
            return
        }

        rental.completed = true

        if (!isNaN(discount_price)) {
            rental.discount_value = discount_price;
        }

        await this.increaseProductsQuantity(rental.products)

        await rental.save()
    }

    public async edit(id: number, discount_price: number) {
        const rental: Rental = await this.createRentalSearchQuery()
            .andWhere('entity.id = :id', { id })
            .getOne() as Rental

        if (!rental){
            return
        }

        if(rental.completed == true){
            throw new Error ('You can not edit the discount value from a completed rent.')
        }

        if(rental.total_price <= discount_price){
            throw new Error ('This pricing will be 0 or negative. Please, type another value.')
        }

        if (isNaN(discount_price)) {
           throw new Error ('To edit, you have send some value.')
        }

        rental.discount_value = discount_price;

        await this.increaseProductsQuantity(rental.products)

        await rental.save()
    }

    public async create(data: RentalCreationData): Promise<Rental> {
        const rentedProductsWithDailyPrice: RentedProductData[] = await this.getRentedProductsWithDailyPrice(data.products)

        if (this.productsUnavailable(rentedProductsWithDailyPrice))
            throw new Error(`Products don\'t have enough quantity for this rental.`)

        const rental = await Rental.create({
            start_date: data.start_date,
            end_date: data.end_date
        })

        rental.client = await Client.findOneBy({ id: data.client_id })

        rental.total_daily_price = this.getTotalDailyPrice(rentedProductsWithDailyPrice)

        if ((data.discount_value) && (data.discount_value) > 0) {
            rental.discount_value = data.discount_value
        }

        const calcBetweenTwoDates = (start: string, end: string): number => {
            const format1 = (value: string): string => {
                const dt = value.split('/');
                return `${dt[2]}-${dt[0]}-${dt[1]}`;
            };

            const format2 = (value: string): string => {
                const dt = value.split('/');
                return `${dt[2]}-${dt[1]}-${dt[0]}`;
            };

            const startDate = new Date(format1(start));
            const endDate = new Date(format1(end));

            if (typeof (startDate) == 'number' && typeof (endDate) == 'number') {
                const diffTime = new Date(endDate).getTime() - new Date(startDate).getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays + 1;
            } else {
                console.log('Datas inválidas');
                return -1; // ou outro valor que indique erro
            }
        };

        // Exemplo de uso:
        const start = '05/10/2024';
        const end = '05/15/2024';
        const daysDifference = calcBetweenTwoDates(start, end);
        console.log(`Diferença em dias: ${daysDifference}`);

        await rental.save()

        await this.decreaseProductsQuantity(rentedProductsWithDailyPrice)

        await this.createRentedProductsEntities(rental, rentedProductsWithDailyPrice as RentedProduct[])

        this.removeCircularLinksFromRental(rental)

        return rental
    }

    public async delete(id: number | string) {
        const rental: Rental = await this.createRentalSearchQuery()
            .andWhere('entity.id = :id', { id })
            .getOne() as Rental

        await this.increaseProductsQuantity(rental.products)

        if (!rental)
            return

        await RentedProduct.remove(rental.products)

        await Rental.remove(rental)
    }

    public async getAllRents() {
        try {

            const rental = await Rental.find()

            return rental;
        } catch (error) {
            return []
        }
    }

    public async getResumedRents() {
        try {

            const rental = this.nquery(`
            SELECT
                ROUND(SUM(R.DISCOUNT_VALUE)                         , 2) AS DISCOUNT,
                ROUND(SUM(R.TOTAL_PRICE) + SUM(R.DISCOUNT_VALUE)    , 2) AS BRUTE_TOTAL_RECEIPT,
                ROUND(SUM(R.TOTAL_PRICE)                            , 2) AS LIQUID_RECEIPT,
                ROUND(COUNT(R.ID)                                   , 2) AS RENTAL_QUANTITY,
                ROUND((
                    SELECT
                        SUM(T.TOTAL_PRICE)
                    FROM RENTALS T
                    WHERE T.COMPLETED = TRUE
                )                                                   , 2) AS RECEIVED,
                ROUND((
                    SELECT
                        SUM(T.TOTAL_PRICE)
                    FROM RENTALS T
                    WHERE T.COMPLETED = FALSE
                )                                                   , 2) AS NOT_RECEIVED,
                ROUND((
                    SELECT
                        SUM(T.TOTAL_PRICE)
                    FROM RENTALS T
                    WHERE T.COMPLETED = FALSE
                    AND T.END_DATE < DATE('TODAY')
                )                                                   , 2) AS ARREAR_RECEIPT,
                ROUND((
                    SELECT
                        SUM(T.TOTAL_PRICE)
                    FROM RENTALS T
                    WHERE T.COMPLETED = FALSE
                    AND T.END_DATE = DATE('TODAY')
                )                                                   , 2) AS TODAY_RECEIPT
            FROM RENTALS R
            `, [])

            // return rental;
            return rental
        } catch (error) {
            return []
        }
    }

    public async getRentsPerDay() {
        try {

            const rental = this.nquery(`
            SELECT
                DISTINCT R.START_DATE           AS DATE_OF_RENT,
                SUM(ROUND(R.TOTAL_PRICE, 2))    AS TOTAL_PRICE
            FROM RENTALS R
            GROUP BY R.START_DATE
            `, [])

            // return rental;
            return rental
        } catch (error) {
            return []
        }
    }

    public async getRentsPaymentPrev() {
        try {

            const rental = this.nquery(`
            SELECT
                DISTINCT R.END_DATE           AS DATE_OF_RENT,
                SUM(ROUND(R.TOTAL_PRICE, 2))    AS TOTAL_PRICE
            FROM RENTALS R
            WHERE R.completed = FALSE
            AND R.end_date >= DATE('NOW')
            GROUP BY R.END_DATE
            `, [])

            // return rental;
            return rental
        } catch (error) {
            return []
        }
    }

    
    public async addDiscount() {
        try {

            const rental = this.nquery(`
            SELECT
                DISTINCT R.END_DATE           AS DATE_OF_RENT,
                SUM(ROUND(R.TOTAL_PRICE, 2))    AS TOTAL_PRICE,
                R.COMPLETED                     AS STATUS
            FROM RENTALS R
            GROUP BY R.END_DATE
            `, [])

            // return rental;
            return rental
        } catch (error) {
            return []
        }
    }

}