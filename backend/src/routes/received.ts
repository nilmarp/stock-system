import express, { Request, Response, Router } from 'express'
import { RentalRepository } from '../repositories/rental'
import { DateHelper } from '../common/DateHelper'
import { Rental } from '../entity/Rental'
const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const repository = new RentalRepository

    const rental: Rental = await repository.create({
        client_id: 2,
        products: [
            {
                id: 4,
                quantity: 2
            },
            {
                id: 7,
                quantity: 1
            }
        ],
        start_date: new Date,
        end_date: new DateHelper(new Date).addDays(20).get()
    })

    console.log(rental)

    return res.json(rental)
})

export default router