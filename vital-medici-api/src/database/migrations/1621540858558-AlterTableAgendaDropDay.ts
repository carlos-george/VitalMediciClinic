import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAgendaDropDay1621540858558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.changeColumn('agendas', 'day', new TableColumn({
            name: 'day',
            type: 'date'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
