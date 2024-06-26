import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1705608953718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'description',
                    type: 'string',
                    isNullable: false
                },
                {
                    name: 'quantity_owned',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'daily_price',
                    type: 'decimal',
                    isNullable: false
                },
                {
                    name: 'deletedAt',
                    type: 'date',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
