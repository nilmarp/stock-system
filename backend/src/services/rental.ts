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

        console.log(JSON.stringify(rentals))

        return res.render('withdrawn', {
            rentals,
            type: 'on-time'
        })
    }

    public async getAboutToExpire(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsAboutToExpire().paginate({ page })
    
        return res.render('withdrawn', {
            rentals,
            type: 'about-to-expire'
        })
    }

    public async getInArrears(req: Request, res: Response) : Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsInArrears().paginate({ page })

        return res.render('withdrawn', {
            rentals,
            type: 'in-arrears'
        })
    }

    public async receive(req: Request, res: Response) {
        try {
            await this.repository.receive(Number(req.params.id))
        } catch (e) {
            console.log(e.message)
            // TODO: Error handling
        }

        res.redirect('back')
    }
}