import express, { Request, Response, Router } from 'express'
import { IndexService } from '../services'
import { ClientRepository } from '../repositories/client'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    const service: IndexService = new IndexService(new ClientRepository)
    service.index(req, res)
})

import clientRouter from './clients'

router.use('/client', clientRouter)

export default router