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

        return res.render('stock', {
            products
        })
    }

    public async store(req: Request, res: Response) {
        const product = await this.repository.create(req.body)

        if (!product) {
            // flash message
        }

        return res.redirect('back')
    }

    public async update(req: Request, res: Response) {
        try {
            await this.repository.update(Number(req.params.id), req.body)
        } catch (e) {
            console.log(e.message)
            // TODO: Error handling
        }

        res.redirect('back')
    }

}