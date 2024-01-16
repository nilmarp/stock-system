import express, { Request, Response, NextFunction, Router } from 'express'
import { ClientService } from '../services/client'
import { ClientRepository } from '../repositories/client'

const router: Router = express.Router()

import { ClientValidator } from '../validators/ClientValidator'

router.post('/', (req: Request, res: Request, next: NextFunction) => {
    const validator = new ClientValidator
    return validator.validate(req, res, next)
}, async (req: Request, res: Response) => {
    const service: ClientService = new ClientService(new ClientRepository)
    
    service.store(req, res)
})

export default router