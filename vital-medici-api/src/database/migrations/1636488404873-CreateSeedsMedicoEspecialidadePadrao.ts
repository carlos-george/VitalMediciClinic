import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from 'uuid';

export class CreateSeedsMedicoEspecialidadePadrao1636488404873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const idMedico = uuid();
        const idEspecialidade = uuid();

        await queryRunner.query(`insert into especialidades(id, descricao) values('${idEspecialidade}', 'Bioquímica')`);

        await queryRunner.query(`insert into medicos(id, nome, crm, telContato, dataNascimento, isactive, created_at) values ('${idMedico}','Renata Vitoriano', '123456', '(00) 0000-0000', '1983-05-18', true, date('now'))`);

        await queryRunner.query(`insert into medicos_especialidades(id, medico_id, especialidade_id, valor) values ('${uuid()}','${idMedico}', '${idEspecialidade}', 0.00)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
