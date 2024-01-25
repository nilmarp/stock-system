import { Request, Response } from 'express'
import { IRepository } from '../repositories/repository'
import { PaginationAwareObject } from '../common/pagination'

export class StockService {
    private repository: IRepository

    constructor(repository: IRepository) {
        this.repository = repository
    }

    public async index(req: Request, res: Response) {
        const { page } = req.query

        const products: PaginationAwareObject = await this.repository.paginate({ page })

        return res.render('stock', {
            products
        })
    }

    public async store(req: Request, res: Response) {
        const product = await this.repository.create(req.body)

        if (!product) {
            // flash message
        }

        return product
    }

}