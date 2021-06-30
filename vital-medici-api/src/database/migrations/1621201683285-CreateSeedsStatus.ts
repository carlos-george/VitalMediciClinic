import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from 'uuid';

export class CreateSeedsStatus1621201683285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'A Confirmar')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Confirmado')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Não Confirmado')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Desmarcado')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Finalizado')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Em Andamento')`);
        await queryRunner.query(`insert into status(id, descricao) values('${uuid()}', 'Em Espera')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
