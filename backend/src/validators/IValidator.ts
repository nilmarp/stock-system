import { Request, Response, NextFunction } from 'express'

export interface IValidator {

    rules(): any[]

    failed(errors: any, Request, Response, NextFunction)

    validate(Request, Response, NextFunction)

}