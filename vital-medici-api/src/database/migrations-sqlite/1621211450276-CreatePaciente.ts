import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaciente1621211450276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'pacientes',
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
                    name: 'FK_Enderecos',
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
