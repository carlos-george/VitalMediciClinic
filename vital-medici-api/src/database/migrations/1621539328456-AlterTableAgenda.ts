import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAgenda1621539328456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('agendas', new TableColumn({
            name: 'day',
            type: 'timestamp'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
