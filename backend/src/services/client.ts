import { Request, Response } from 'express'
import { IRepository } from '../repositories/repository'

export class ClientService {
    private repository: IRepository

    constructor(repository: IRepository) {
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