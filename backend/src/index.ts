import { AppDataSource } from './database/data-source'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import router from './routes'

dotenv.config()

const app = express()

const PUBLIC_FOLDER: string = path.join(__dirname, '../../backend/src/public')
const VIEWS_FOLDER: string = path.join(__dirname, '../../backend/src/views')

app.use(express.static(PUBLIC_FOLDER));
app.set('views', VIEWS_FOLDER)
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

AppDataSource.initialize().then(async () => {
    app.listen(process.env.PORT || 3000)
}).catch(error => console.log(error))