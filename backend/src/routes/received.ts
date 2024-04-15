import express, { Request, Response, Router } from 'express'
import { RentalRepository } from '../repositories/rental'
import { RentalService } from '../services/rental'
const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.getReceived(req, res)
})

router.get('/all', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.getAllReceived(req, res)
})

export default router