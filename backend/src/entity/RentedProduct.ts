import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Rental } from "./Rental"
import { Product } from "./Product"

@Entity('rented_products')
export class RentedProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_quantity: number

    @ManyToOne(() => Rental, rental => rental.products)
    @JoinColumn({
        name: 'rentals',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'rental_id'
    })
    rental: Rental

    @ManyToOne(() => Product, product => product.rentals)
    @JoinColumn({
        name: 'clients',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'client_id'
    })
    product: Product

    @Column('decimal', { precision: 6, scale: 2 })
    daily_price: number
}