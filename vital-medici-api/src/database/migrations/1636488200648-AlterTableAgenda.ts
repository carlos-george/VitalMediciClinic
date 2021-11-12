import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAgenda1636488200648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('agendas', new TableColumn({
            name: 'medEspDesc',
            type: 'varchar'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
