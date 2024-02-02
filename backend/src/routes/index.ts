import express, { Request, Response, Router } from 'express'
import { IndexService } from '../services'
import { ClientRepository } from '../repositories/client'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    const service: IndexService = new IndexService(new ClientRepository)
    service.index(req, res)
})


import clientRouter from './clients'
import stockRouter from './stock'
import withdrawnRouter from './withdrawn'
import receivedRouter from './received'

router.use('/client', clientRouter)
router.use('/stock', stockRouter)
router.use('/withdrawn', withdrawnRouter)
router.use('/received', receivedRouter)

export default router