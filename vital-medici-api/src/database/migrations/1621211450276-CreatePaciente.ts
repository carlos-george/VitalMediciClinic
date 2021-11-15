import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaciente1621207848271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'pacientes',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'documento',
                    type: 'varchar'
                },
                {
                    name: 'datanascimento',
                    type: 'timestamp'
                },
                {
                    name: 'telContato',
                    type: 'varchar'
                },
                {
                    name: 'endereco_id',
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
                    name: 'FK_Pacientes_Enderecos',
                    referencedTableName: 'enderecos',
                    referencedColumnNames: ['id'],
                    columnNames: ['endereco_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pacientes');
    }

}
