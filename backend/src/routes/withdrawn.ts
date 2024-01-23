import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    return res.render('withdrawn')
})

export default router