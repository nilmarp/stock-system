import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientTable1705343917387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clients',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'identification_number', // ambos cpf e cnpj
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'reference',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'building_number',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'cep',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients')
    }

}
