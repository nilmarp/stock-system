import express, { Request, Response, NextFunction, Router } from 'express'
import { StockService } from '../services/stock'
import { ProductRepository } from '../repositories/product'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service: StockService = new StockService(new ProductRepository)
    
    service.index(req, res)
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    // validator
}, async (req: Request, res: Response) => {
    const service: StockService = new StockService(new ProductRepository)

    service.store(req, res)
})

export default router