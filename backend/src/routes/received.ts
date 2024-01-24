import express, { Request, Response, Router } from 'express'
import { RentalRepository } from '../repositories/rental'
import { Rental } from '../entity/Rental'
import { Client } from '../entity/Client'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const repository = new RentalRepository

    const rental: Rental = await repository.create({
        client_id: 1,
        products: [
            {
                id: 1,
                quantity: 2
            }
        ],
        start_date: new Date,
        end_date: new Date
    })

    return res.render('received')
})

export default router