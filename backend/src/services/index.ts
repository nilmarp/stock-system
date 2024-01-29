import { PaginationAwareObject } from '../common/pagination'
import { ClientRepository } from '../repositories/client'
import { Request, Response } from 'express'

export class IndexService {
    private clientRepository: ClientRepository
    
    constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository
    }
    
    public async index(req: Request, res: Response) {
        const { page } = req.query

        await this.clientRepository.update(1, {
            name: 'Luizim',
            identification_number: '000.000.000-05'
        })

        const clients: PaginationAwareObject = await this.clientRepository.paginate(page)

        res.render('index', {
            clients
        })
    }
}