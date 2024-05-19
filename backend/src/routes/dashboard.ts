import express, { Request, Response, Router } from 'express'
import { RentalService } from '../services/rental'
import { RentalRepository } from '../repositories/rental'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository);

    return service.getResumedRents(req, res)
})

router.get('/finances/rents', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository);

    return service.getRentsPerDay(req, res)
})


router.get('/finances/prev', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository);

    return service.getRentsPaymentPrev(req, res)
})

export default router;