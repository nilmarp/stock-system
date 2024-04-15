import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Discount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dicountable_id: number

    @Column()
    discountable_type: string

    @Column()
    amount: number

    @Column()
    redeemed_at: Date

    @Column()
    expired_at: Date
}
