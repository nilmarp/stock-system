import { ClientRepository } from '../repositories/client'
import { Request, Response } from 'express'

export class IndexService {
    private clientRepository: ClientRepository
    
    constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository
    }
    
    public async index(req: Request, res: Response) {
        const clients = await this.clientRepository.findAll()

        res.render('index', {
            clients
        })
    }
}