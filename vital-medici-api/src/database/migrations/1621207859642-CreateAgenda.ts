import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAgenda1621206981774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'agendas',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'hora',
                    type: 'integer'
                },
                {
                    name: 'medico_especialidade_id',
                    type: 'uuid'
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
                    type: 'uuid'
                },
                {
                    name: 'tipoConsulta_id',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
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
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendas');
    }

}
