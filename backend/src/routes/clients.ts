import express, { Request, Response, NextFunction, Router } from 'express'
import { ClientService } from '../services/client'
import { ClientRepository } from '../repositories/client'

const router: Router = express.Router()

import Validator from '../validators/ClientValidator'

router.use((req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator

    validator.validate(req, res, next)
})

router.post('/', async (req: Request, res: Response) => {
    const service: ClientService = new ClientService(new ClientRepository)
    
    service.store(req, res)
})

router.post('/:id/edit', async (req: Request, res: Response) => {
    const service: ClientService = new ClientService(new ClientRepository)
    
    service.update(req, res)
})

export default router