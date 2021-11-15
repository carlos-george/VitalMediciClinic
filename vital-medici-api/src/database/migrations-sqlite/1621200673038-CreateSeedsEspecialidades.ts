import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from 'uuid';

export class CreateSeedsEspecialidades1621200673038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Acupuntura')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Alergia e Imunologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Anestesiologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Angiologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cancerologia (oncologia)')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cardiologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Cardiovascular')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia da Mão')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia de cabeça e pescoço')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia do Aparelho Digestivo')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Geral')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Pediátrica')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Plástica')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Torácica')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Cirurgia Vascular')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Clínica Médica (Medicina interna) ')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Coloproctologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Dermatologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Endocrinologia e Metabologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Endoscopia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Gastroenterologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Genética médica')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Geriatria')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Ginecologia e obstetrícia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Hematologia e Hemoterapia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Homeopatia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Infectologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Mastologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina de Família e Comunidade')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina de Emergência')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina do Trabalho')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina do Tráfego')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Esportiva')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Física e Reabilitação')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Intensiva')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Legal e Perícia Médica (ou medicina forense)')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Nuclear')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Medicina Preventiva e Social')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Nefrologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Neurocirurgia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Neurologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Nutrologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Obstetrícia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Oftalmologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Ortopedia e Traumatologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Otorrinolaringologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Patologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Patologia Clínica/Medicina laboratorial')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Pediatria')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Pneumologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Psiquiatria')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Radiologia e Diagnóstico por Imagem')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Radioterapia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Reumatologia')`);
        await queryRunner.query(`insert into especialidades(id, descricao) values('${uuid()}', 'Urologia')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
