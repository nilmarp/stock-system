import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('rented_products')
export class RentedProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    product_quantity: number

    @Column()
    daily_price: number

}

