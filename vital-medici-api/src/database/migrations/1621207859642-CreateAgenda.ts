import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAgenda1621207848269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'agendas',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'hora',
                    type: 'integer'
                },
                {
                    name: 'medico_especialidade_id',
                    type: 'varchar'
                },
                {
                    name: 'nomePaciente',
                    type: 'varchar'
                },
                {
                    name: 'nomeAcompanhante',
                    type: 'varchar'
                },
                {
                    name: 'telContatoPaciente',
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
                    name: 'day',
                    type: 'date'
                },
                {
                    name: 'medEspDesc',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_Agendas_Medico_Especialidade',
                    referencedTableName: 'medicos_especialidades',
                    referencedColumnNames: ['id'],
                    columnNames: ['medico_especialidade_id'],
                },
                {
                    name: 'FK_Agendas_Status',
                    referencedTableName: 'status',
                    referencedColumnNames: ['id'],
                    columnNames: ['status_id'],
                },
                {
                    name: 'FK_Agendas_Tipos_Consultas',
                    referencedTableName: 'tipos_consultas',
                    referencedColumnNames: ['id'],
                    columnNames: ['tipoConsulta_id'],
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendas');
    }

}
