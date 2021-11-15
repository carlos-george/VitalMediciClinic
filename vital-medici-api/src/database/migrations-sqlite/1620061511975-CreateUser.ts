import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614548238094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'firstname',
                        type: 'varchar',

                    },
                    {
                        name: 'lastname',
                        type: 'varchar',

                    },
                    {
                        name: 'datebirth',
                        type: 'date'
                    },
                    {
                        name: 'username',
                        type: 'varchar',

                    },
                    {
                        name: 'password',
                        type: 'varchar',

                    },
                    {
                        name: 'isactive',
                        type: 'boolean',

                    },
                    {
                        name: 'issystemadmin',
                        type: 'boolean',

                    },
                    {
                        name: 'role_id',
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
                        name: 'FK_User_Roles',
                        columnNames: ['role_id'],
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
