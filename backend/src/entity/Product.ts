import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    quantity: number

    @Column('decimal', { precision: 6, scale: 2 })
    daily_price: number
}
