import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConsulta1621210499649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'consultas',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'anamnese',
                    type: 'varchar'
                },
                {
                    name: 'medico_especialidade_id',
                    type: 'uuid'
                },
                {
                    name: 'paciente_id',
                    type: 'uuid'
                },
                {
                    name: 'status_id',
                    type: 'uuid'
                },
                {
                    name: 'tipoConsulta_id',
                    type: 'uuid'
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_Medico_Especialidade',
                    referencedTableName: 'medicos_especialidades',
                    referencedColumnNames: ['id'],
                    columnNames: ['medico_especialidade_id'],
                },
                {
                    name: 'FK_Status',
                    referencedTableName: 'status',
                    referencedColumnNames: ['id'],
                    columnNames: ['status_id'],
                },
                {
                    name: 'FK_Tipos_Consultas',
                    referencedTableName: 'tipos_consultas',
                    referencedColumnNames: ['id'],
                    columnNames: ['tipoConsulta_id'],
                },
                {
                    name: 'FK_Pacientes',
                    referencedTableName: 'pacientes',
                    referencedColumnNames: ['id'],
                    columnNames: ['paciente_id'],
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('consultas');
    }

}
