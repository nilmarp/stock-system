import { BaseEntity, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { RentedProduct } from "./RentedProduct"

@Entity('rentals')
export class Rental extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Client, (client) => client.rentals)
    client: Client

    @ManyToMany(() => RentedProduct )
    @JoinTable()
    products: RentedProduct[]
}
