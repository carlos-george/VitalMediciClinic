import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export class CreateSeedsRoles1620826624060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into roles(id, name, description) values ('${uuid()}', 'ROLE_ADMIN', 'Administrador')`);
        await queryRunner.query(`insert into roles(id, name, description) values ('${uuid()}', 'ROLE_USER', 'Usuário')`);
        await queryRunner.query(`insert into roles(id, name, description) values ('${uuid()}', 'ROLE_MEDICO', 'Médico')`);

        //await queryRunner.query(`insert into users_roles(user_id, role_id) values ((SELECT ID FROM USERS WHERE USERNAME = 'vm_admin'), (SELECT ID FROM ROLES WHERE NAME = 'ROLE_ADMIN'))`);

        await queryRunner.query(`insert into users(id, firstname, lastname, datebirth, username, password, isactive, issystemadmin, role_id, created_at) values ('${uuid()}','admin', 'admin', '1983-01-31', 'vm_admin', '${await bcrypt.hash('123456', 10)}', true, true, (SELECT ID FROM ROLES WHERE NAME = 'ROLE_ADMIN'), date('now'))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // nothing to do
    }

}
