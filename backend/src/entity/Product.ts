import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm"
import { Rental } from "./Rental"
import { RentedProduct } from "./RentedProduct"

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    quantity_owned: number

    @Column()
    quantity: number

    @Column('decimal', { precision: 6, scale: 2 })
    daily_price: number

    @OneToMany(() => RentedProduct, rental => rental.product)
    @JoinTable({
        name: 'rented_products',
        joinColumn: { name: 'product_id '},
        inverseJoinColumn: { name: 'rental_id' }
    })
    rentals: RentedProduct[]

    @DeleteDateColumn()
    public deletedAt?: Date
}
