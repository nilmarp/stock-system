import express, { Request, Response, NextFunction, Router } from 'express'
import { ClientService } from '../services/client'
import { ClientRepository } from '../repositories/client'

const router: Router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    const service: ClientService = new ClientService(new ClientRepository)
    
    service.store(req, res)
})

router.post('/:id/edit', async (req: Request, res: Response) => {
    const service: ClientService = new ClientService(new ClientRepository)
    
    service.update(req, res)
})

router.post('/:id/delete', async (req: Request, res: Response) => {
    const service = new ClientService(new ClientRepository)

    service.delete(req, res)
})

export default router