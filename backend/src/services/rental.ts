import { Request, Response } from 'express'
import { RentalRepository } from '../repositories/rental'
import { IPagination } from '../common/pagination'
import { Rental } from '../entity/Rental'

export class RentalService {
    private repository: RentalRepository

    constructor(repository: RentalRepository) {
        this.repository = repository
    }

    public async getOnTime(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsOnTime(page)

        return res.render('withdrawn', {
            rentals,
            type: 'on-time'
        })
    }

    public async getAboutToExpire(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsAboutToExpire(page)
    
        return res.render('withdrawn', {
            rentals,
            type: 'about-to-expire'
        })
    }

    public async getInArrears(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsInArrears(page)

        return res.render('withdrawn', {
            rentals,
            type: 'in-arrears'
        })
    }
}