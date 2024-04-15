import express, { Request, Response, NextFunction, Router } from 'express'
import { StockService } from '../services/stock'
import { ProductRepository } from '../repositories/product'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const service: StockService = new StockService(new ProductRepository)
    
    service.index(req, res)
})

router.post('/', async (req: Request, res: Response) => {
    const service: StockService = new StockService(new ProductRepository)

    service.store(req, res)
})

router.post('/:id/edit', async (req: Request, res: Response) => {
    const service: StockService = new StockService(new ProductRepository)

    service.update(req, res)
})

router.post('/:id/delete', async (req: Request, res: Response) => {
    const service = new StockService(new ProductRepository)

    service.delete(req, res)
})

export default router