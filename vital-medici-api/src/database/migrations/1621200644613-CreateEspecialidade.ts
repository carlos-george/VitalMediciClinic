import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEspecialidade1621200644613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'especialidades',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'descricao',
                    type: 'varchar'
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('especialidades');
    }

}
