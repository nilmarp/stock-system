import { Request, Response } from 'express'
import { RentalRepository } from '../repositories/rental'
import { IPagination, PaginationAwareObject } from '../common/pagination'
import { Rental } from '../entity/Rental'

export class RentalService {
    private repository: RentalRepository

    constructor(repository: RentalRepository) {
        this.repository = repository
    }

    public async getAll(req: Request, res: Response) {
        try {
            const rentals = await this.repository.getAllRents();
            return res.json({rentals})
        } catch (error) {

        }
    }

    public async getAllReceived(req: Request, res: Response) {
        try {
            const rentals = await this.repository.findCompletedRentals().all()
            return res.json({ rentals })
        } catch (error) {

        }
    }

    public async getAllReceivedWithinDates(req: Request, res: Response) {
        const startDate = new Date(req.query.startDate)
        const finalDate = new Date(req.query.finalDate)
        
        const rentals = await this.repository.findCompletedRentalsWithinDates(startDate, finalDate).all()

        return res.json({ rentals })
    }

    public async getOnTime(req: Request, res: Response): Promise<IPagination<Rental>> {
        const { page } = req.query
    
        const rentals: PaginationAwareObject = await this.repository.findRentalsOnTime().paginate({ page })
        
        try {
            console.log(JSON.stringify(rentals))        
            return res.json({ rentals })
        } catch (error) {
            console.log(error.message)
        }
    }

    public async getAboutToExpire(req: Request, res: Response): Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsAboutToExpire().paginate({ page })

        return res.json({ rentals })
    }

    public async getInArrears(req: Request, res: Response): Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findRentalsInArrears().paginate({ page })

        return res.json({ rentals })
    }

    public async getReceived(req: Request, res: Response): Promise<IPagination<Rental>> {
        const { page } = req.query

        const rentals = await this.repository.findCompletedRentals().paginate({ page })

        return res.json({ rentals })
    }

    public async receive(req: Request, res: Response) {
        try {
            const rental = await this.repository.receive(Number(req.params.id), Number(req.params.discount))

            return res.json({rental})
        } catch (e) {
            console.log(e.message)
            // TODO: Error handling
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            const rental = await this.repository.edit(Number(req.params.id), Number(req.params.discount))

            return res.json({rental})
        } catch (e) {
            console.log(e.message)
            // TODO: Error handling
        }
    }

    public async store(req: Request, res: Response) {
        try {
            const rental = await this.repository.create(req.body)

            return res.json(rental)
        } catch (e) {
            res.json({ error: e.message, bd: req.body })
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(req.params.id)

            res.status(204).json({})
        } catch (e) {
            res.json({ error: e.message, bd: req.body })
        }
    }

    public async getResumedRents(req: Request, res: Response) {
        try {
            const content = await this.repository.getResumedRents()

            return res.status(200).json(content)
        } catch (e) {
            console.log(e);
            
            res.json({ error: e.message, bd: req.body })
        }
    }

    public async getRentsPerDay(req: Request, res: Response) {
        try {
            const content = await this.repository.getRentsPerDay()

            return res.status(200).json(content)
        } catch (e) {
            console.log(e);
            
            res.json({ error: e.message, bd: req.body })
        }
    }

    public async getRentsPaymentPrev(req: Request, res: Response) {
        try {
            const content = await this.repository.getRentsPaymentPrev()

            return res.status(200).json(content)
        } catch (e) {
            console.log(e);
            
            res.json({ error: e.message, bd: req.body })
        }
    }

    public async addDiscount(req: Request, res: Response) {
        try {
            const content = await this.repository.addDiscount()

            return res.status(200).json(content)
        } catch (e) {
            console.log(e);
            
            res.json({ error: e.message, bd: req.body })
        }
    }
}