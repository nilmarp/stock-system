import express, { Request, Response, Router } from 'express'
import { RentalRepository } from '../repositories/rental'
import { Rental } from '../entity/Rental'
import { DateHelper } from '../common/DateHelper'
const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const repository = new RentalRepository

    const rental: Rental = await repository.create({
        client_id: 1,
        products: [
            {
                id: 1,
                quantity: 2
            },
            {
                id: 2,
                quantity: 1
            }
        ],
        start_date: new Date,
        end_date: new DateHelper(new Date).addDays(20).get()
    })

    console.log(rental)

    return res.render('received')
})

export default router