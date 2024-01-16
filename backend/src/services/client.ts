import { Request, Response } from 'express'
import { ClientRepository } from '../repositories/client';

export class ClientService {
    private repository: ClientRepository

    constructor(repository: ClientRepository) {
        this.repository = repository
    }

    public async store(req: Request, res: Response) {
        const client = await this.repository.create(req.body)

        if (!client) {
            // aqui criaria alguma flash message mas deixa pra depois
        }
        
        res.redirect('back')
    }
}