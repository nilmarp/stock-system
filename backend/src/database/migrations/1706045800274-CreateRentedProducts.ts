import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentedProducts1706045800274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'rented_products',
            columns: [
                {
                    name: 'rental_id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'product_id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'product_quantity',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'daily_price',
                    type: 'decimal',
                    isNullable: false
                },
                {
                    name: 'returned',
                    type: 'boolean',
                    default: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['rental_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'rentals'
                },
                {
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'products'
                }, 
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('rented_products')
    }

}
