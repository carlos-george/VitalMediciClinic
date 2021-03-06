import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEndereco1621207848270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'enderecos',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'cep',
                    type: 'integer'
                },
                {
                    name: 'logradouro',
                    type: 'varchar'
                },
                {
                    name: 'numero',
                    type: 'varchar'
                },
                {
                    name: 'complemento',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enderecos');
    }

}
