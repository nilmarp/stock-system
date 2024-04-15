import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateClientTable1705343917387 } from './migrations/1705343917387-CreateClientTable'
import { CreateProductTable1705608953718 } from "./migrations/1705608953718-CreateProductTable"
import path from 'path'

import dotenv from 'dotenv'
import { Client } from "../entity/Client"
import { Product } from "../entity/Product"
import { CreateRentalsTable1705953611076 } from "./migrations/1705953611076-CreateRentalsTable"
import { Rental } from "../entity/Rental"
import { CreateRentedProducts1706045800274 } from "./migrations/1706045800274-CreateRentedProducts"
import { RentedProduct } from "../entity/RentedProduct"
import { CreateDiscountsTable1713129952724 } from "./migrations/1713129952724-CreateDiscountsTable"

dotenv.config()

const DATABASE_FILE_PATH: string = path.join(__dirname, '../../') + (process.env.DB_NAME || 'guarita_andaimes_db.sqlite')

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: DATABASE_FILE_PATH,
    synchronize: true,
    logging: false,
    entities: [Client, Product, Rental, RentedProduct],
    migrations: [CreateClientTable1705343917387, CreateProductTable1705608953718, CreateRentalsTable1705953611076, CreateRentedProducts1706045800274, CreateDiscountsTable1713129952724],
    subscribers: [],
})
