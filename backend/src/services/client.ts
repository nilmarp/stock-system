import { Request, Response } from 'express'
import { IRepository } from '../repositories/repository'
import { ClientRepository } from '../repositories/client'

export class ClientService {
    private repository: ClientRepository

    constructor(repository: ClientRepository) {
        this.repository = repository
    }

    public async store(req: Request, res: Response) {
        const client = await this.repository.create(req.body)

        if (!client) {
            // TODO: error handling
        }

        res.json(client)
    }

    public async update(req: Request, res: Response) {
        try {
            const client = await this.repository.update(req.params.id, req.body)

            res.json(client)
        } catch (e) {
            // TODO: error handling
            console.log(e.message)

            res.json({ error: e, bd: req.body })
        }
    }
}