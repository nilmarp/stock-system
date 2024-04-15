import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDiscountsTable1713129952724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'discounts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    generationStrategy: 'increment'
                },
                {
                    name: 'discountable_id',
                    type: 'int',
                },
                {
                    name: 'discountable_type',
                    type: 'string',
                },
                {
                    name: 'amount',
                    type: 'int',
                    isNullable: false,
                    comment: 'Amount in cents'
                },
                {
                    name: 'redeemed_at',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'expires_at',
                    type: 'timestamp',
                    isNullable: true
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
        queryRunner.dropTable('discounts')
    }

}
