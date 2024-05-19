import express, { Request, Response, Router } from 'express'
import { RentalService } from '../services/rental'
import { RentalRepository } from '../repositories/rental'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository);

    service.getAll(req, res)
})

router.post('/', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.store(req, res)
})

router.post('/:id/delete', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.delete(req, res)
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

router.post('/:id/receive/:discount', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.receive(req, res)
})

router.post('/:id/edit/:discount', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.edit(req, res)
})

router.post('/:id/receive', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.receive(req, res)
})

router.post('/:id/add-discount', async (req: Request, res: Response) => {
    const service = new RentalService(new RentalRepository)

    service.addDiscount(req, res)
})

export default router