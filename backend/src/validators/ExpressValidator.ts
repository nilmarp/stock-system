import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import { IValidator } from './IValidator';

export abstract class ExpressValidator implements IValidator {
    abstract rules(): any[]

    abstract failed(errors: any, req: Request, res: Response, next: NextFunction)

    async validate(req: Request, res: Response, next: NextFunction) {
        const rules = this.rules()

        for (const rule of rules)
            await rule.run(req)

        const errors = validationResult(req)
    
        if (errors.isEmpty())
            return next()

        this.failed(errors, req, res, next)
    }

}