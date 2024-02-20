import { Request, Response } from 'express'
import { RentalRepository } from '../repositories/rental'
import { IPagination, PaginationAwareObject } from '../common/pagination'
import { Rental } from '../entity/Rental'

export class RentalService {
    private repository: RentalRepository

    constructor(repository: RentalRepository) {
        this.repository = repository
    }

    public async getOnTime(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals: PaginationAwareObject = await this.repository.findRentalsOnTime().paginate({ page })

        try {
            return res.json({rentals})            
        } catch (error) {
            console.log(error.message)
        }
    }

    public async getAboutToExpire(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsAboutToExpire().paginate({ page })
    
        return res.json({rentals})
    }

    public async getInArrears(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsInArrears().paginate({ page })

        return res.json({rentals})
    }

    public async receive(req: Request, res: Response) {
        try {
            await this.repository.receive(Number(req.params.id))
        } catch (e) {
            console.log(e.message)
            // TODO: Error handling
        }
    }
}