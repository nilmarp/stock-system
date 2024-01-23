import express, { Request, Response, Router } from 'express'
import { Rental } from '../entity/Rental'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {

    const data = {
        client_id: 0,
        products: []
    }

    const rental = new Rental;

    return res.render('received')
})

export default router