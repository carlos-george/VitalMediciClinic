import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedico1621202450803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'medicos',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'crm',
                    type: 'varchar'
                },
                {
                    name: 'telContato',
                    type: 'varchar'
                },
                {
                    name: 'dataNascimento',
                    type: 'timestamp'
                },
                {
                    name: 'isactive',
                    type: 'boolean',

                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },

            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medicos');
    }

}
