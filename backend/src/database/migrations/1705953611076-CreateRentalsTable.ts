import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentalsTable1705953611076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'rentals',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'client_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'total_daily_price',
                    type: 'decimal',
                    isNullable: false
                },
                {
                    name: 'discount_price',
                    type: 'decimal',
                    isNullable: true
                },
                {
                    name: 'total_price',
                    type: 'decimal',
                    isNullable: true
                },
                {
                    name: 'start_date',
                    type: 'date',
                    isNullable: false
                },
                {
                    name: 'end_date',
                    type: 'date',
                    isNullable: false
                },
                {
                    name: 'completed',
                    type: 'boolean',
                    default: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['client_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'clients'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('rentals')
    }

}
