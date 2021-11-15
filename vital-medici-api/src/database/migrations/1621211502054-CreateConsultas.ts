import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConsulta1621207848272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'consultas',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'anamnese',
                    type: 'varchar'
                },
                {
                    name: 'medico_especialidade_id',
                    type: 'varchar'
                },
                {
                    name: 'paciente_id',
                    type: 'varchar'
                },
                {
                    name: 'status_id',
                    type: 'varchar'
                },
                {
                    name: 'tipoConsulta_id',
                    type: 'varchar'
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_Consultas_Medico_Especialidade',
                    referencedTableName: 'medicos_especialidades',
                    referencedColumnNames: ['id'],
                    columnNames: ['medico_especialidade_id'],
                },
                {
                    name: 'FK_Consultas_Status',
                    referencedTableName: 'status',
                    referencedColumnNames: ['id'],
                    columnNames: ['status_id'],
                },
                {
                    name: 'FK_Consultas_Tipos_Consultas',
                    referencedTableName: 'tipos_consultas',
                    referencedColumnNames: ['id'],
                    columnNames: ['tipoConsulta_id'],
                },
                {
                    name: 'FK_Consultas_Pacientes',
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
