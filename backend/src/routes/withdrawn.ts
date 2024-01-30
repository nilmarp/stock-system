import express, { Request, Response, Router } from 'express'
import { RentalService } from '../services/rental'
import { RentalRepository } from '../repositories/rental'

const router: Router = express.Router()

router.get('/ontime', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    return await service.getOnTime(req, res)
})

router.get('/expiring', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    return await service.getAboutToExpire(req, res)
})

router.get('/arrears', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    return await service.getInArrears(req, res)
})

export default router