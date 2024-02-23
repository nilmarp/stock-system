import { Request, Response } from 'express'
import { PaginationAwareObject } from '../common/pagination'
import { ProductRepository } from '../repositories/product'

export class StockService {
    private repository: ProductRepository

    constructor(repository: ProductRepository) {
        this.repository = repository
    }

    public async index(req: Request, res: Response) {
        const { page } = req.query

        const products: PaginationAwareObject = await this.repository.paginate({ page })

        console.log(JSON.stringify(products))        
        return res.json(products)
    }

    public async store(req: Request, res: Response) {

        try {

            const product = await this.repository.create(req.body)

            console.log(req.body)

            if (!product) {
                // flash message
            }

            return res.json(product)
        } catch (error) {
            return res.json({error, bd: req.body})
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const product = await this.repository.update(Number(req.params.id), req.body)
            res.json(product)
        } catch (error) {
            console.log(error.message)
            return res.json({error, bd: req.body})
            // TODO: Error handling
        }

    }

}