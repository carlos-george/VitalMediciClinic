import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from 'uuid'

export class CreateSeedsTiposConsultas1621213786386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into tipos_consultas(id, descricao) values ('${uuid()}', 'Consulta');`);
        await queryRunner.query(`insert into tipos_consultas(id, descricao) values ('${uuid()}', 'Retorno');`);
        await queryRunner.query(`insert into tipos_consultas(id, descricao) values ('${uuid()}', 'Labolatório');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
