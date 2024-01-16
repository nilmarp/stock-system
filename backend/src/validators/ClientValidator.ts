import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ExpressValidator } from './ExpressValidator'

export class ClientValidator extends ExpressValidator {

    rules() {
        return [
            body('name', 'Nome inválido').exists().isString(),
            body('surname', 'Sobrenome inválido').exists().isString(),
            body('email', 'E-mail inválido').exists().isEmail(),
            body('identification_number', 'CPF/CNPJ inválido').exists().isString(),
            body('cep', 'CEP inválido').exists().isString()
        ]
    }

    failed(errors, req: Request, res: Response, next: NextFunction) {
        // put some flash message here
        console.log('FLASH MESSAGE: ', errors)
        res.redirect('back')
    }

    

}