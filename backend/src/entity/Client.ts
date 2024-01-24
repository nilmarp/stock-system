import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable } from "typeorm"
import { Rental } from "./Rental"

@Entity('clients')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    identification_number: string

    @Column()
    city: string

    @Column()
    phone: string

    @Column()
    cep: string

    @Column()
    address: string

    @Column()
    building_number: string

    @Column()
    email: string

    @Column({ nullable: true })
    reference: string

    @OneToMany(() => Rental, (rental) => rental.client)
    @JoinTable({ name: 'rentals' })
    rentals: Rental[]
}
