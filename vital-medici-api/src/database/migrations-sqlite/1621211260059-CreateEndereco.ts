import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEndereco1621211260059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'enderecos',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
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
