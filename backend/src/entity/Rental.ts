import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { RentedProduct } from "./RentedProduct"

@Entity('rentals')
export class Rental extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Client, (client) => client.rentals)
    @JoinTable({ name: 'clients' })
    client: Client

    @OneToMany(() => RentedProduct, product => product.rental)
    @JoinTable({
        name: 'rented_products',
        joinColumn: { name: 'rental_id '},
        inverseJoinColumn: { name: 'product_id' }
    })
    products: RentedProduct[]

    @Column({ type: 'date' })
    start_date: Date

    @Column({ type: 'date' })
    end_date: Date

    @Column({ nullable: true, type: 'decimal', precision: 6, scale: 2})
    discount_value: number

    @Column({ nullable: true, type: 'decimal', precision: 6, scale: 2})
    total_price: number

    @Column('decimal', { precision: 6, scale: 2 })
    total_daily_price: number

    @Column({ default: false })
    completed: boolean
}
