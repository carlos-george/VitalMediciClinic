import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicoEspecialidades1621202828621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'medicos_especialidades',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'medico_id',
                    type: 'varchar'
                },
                {
                    name: 'especialidade_id',
                    type: 'varchar'
                },
                {
                    name: 'valor',
                    type: 'decimal'
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_MedEsp_Medicos',
                    referencedTableName: 'medicos',
                    referencedColumnNames: ['id'],
                    columnNames: ['medico_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                {
                    name: 'FK_MedEsp_Especialidades',
                    referencedTableName: 'especialidades',
                    referencedColumnNames: ['id'],
                    columnNames: ['especialidade_id'],
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medicos_especialidades')
    }

}
