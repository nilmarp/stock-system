import express, { Request, Response, Router } from 'express'
import { RentalService } from '../services/rental'
import { RentalRepository } from '../repositories/rental'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository);

    service.getAll(req, res)
})

router.get('/ontime', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.getOnTime(req, res)
})

router.get('/expiring', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.getAboutToExpire(req, res)
})

router.get('/arrears', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.getInArrears(req, res)
})

router.post('/:id/receive', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.receive(req, res)
})

export default router