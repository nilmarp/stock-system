import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ExpressValidator } from './ExpressValidator'

interface ClientCreationData {
    name: string,
    surname: string,
    identification_number: string,
    email: string,
    phone: string,
    city: string,
    address: string,
    building_number: string,
    cep: string,
    reference?: string
}

export default class ClientValidator extends ExpressValidator {

    rules() {
        return [
            body('name', 'Nome inválido').exists().isString(),
            body('surname', 'Sobrenome inválido').exists().isString(),
            body('identification_number', 'CPF/CNPJ inválido').exists().isString(),
            body('email', 'E-mail inválido').exists().isEmail(),
            body('phone', 'Telefone inválido').exists().isString(),
            body('city', 'Cidade inválida').exists().isString(),
            body('address', 'Endereço inválido').exists().isString(),
            body('building_number', 'Número de residência inválido').exists().isString(),
            body('cep', 'CEP inválido').exists().isString()
        ]
    }

    failed(errors, req: Request, res: Response, next: NextFunction) {
        // put some flash message here
        console.log('FLASH MESSAGE: ', errors)
        res.redirect('back')
    }

}