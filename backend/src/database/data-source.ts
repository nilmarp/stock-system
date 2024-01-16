import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateClientTable1705343917387 } from './migrations/1705343917387-CreateClientTable'
import path from 'path'

import dotenv from 'dotenv'
import { Client } from "../entity/Client"

dotenv.config()

const DATABASE_FILE_PATH: string = path.join(__dirname, '../../') + (process.env.DB_NAME || 'guarita_andaimes_db.sqlite')

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: DATABASE_FILE_PATH,
    synchronize: true,
    logging: false,
    entities: [Client],
    migrations: [CreateClientTable1705343917387],
    subscribers: [],
})
