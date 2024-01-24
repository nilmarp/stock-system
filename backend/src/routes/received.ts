import express, { Request, Response, Router } from 'express'
import { Rental } from '../entity/Rental'
import { RentedProduct } from '../entity/RentedProduct'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const start_date = new Date()

    const data = {
        client_id: 0,

        products: [{
            product_id: 0,
            product_quantity: 2,
            daily_price: 30.99 * 2,
        }],

        start_date: start_date.getDate(),
        end_date: start_date.setDate(start_date.getDate() + 30),

        total_daily_price: 30.99 * 2
    }

    const rental = Rental.create(data)
    await rental.save()

    rental.products = RentedProduct.create(data.products as RentedProduct[])
    rental.products.forEach(product => product.rental = rental)

    console.log(rental.products)
    console.log(rental.products[0].rental)

    await RentedProduct.save(rental.products)

    await rental.save()

    console.log(rental)

    console.log(await RentedProduct.find({ relations: ['rental']}))

    return res.render('received')
})

export default router