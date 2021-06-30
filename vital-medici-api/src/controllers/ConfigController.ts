
import { Request } from 'express';
import { Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { EspecialidadeRepo } from '../repositories/EspecialidadeRepo';
import { StatusRepo } from '../repositories/StatusRepo';
import { TipoConsultaRepo } from '../repositories/TipoConsulta';
import { AppErrors } from '../errors/AppErrors';
import EspecialidadeView from '../views/domain/EspecialidadeView';
import StatusView from '../views/domain/StatusView';
import TipoConsultaView from '../views/domain/TipoConsultaView';

class ConfigController {

    async createEspecialidade(request: Request, response: Response) {
        const { descricao } = request.body;

        const especialidadeRepo = getCustomRepository(EspecialidadeRepo);

        const especExist = await especialidadeRepo.findOne({ descricao });

        if (especExist) throw new AppErrors('Especialidade já existente!');

        const especialidade = especialidadeRepo.create({ descricao });

        await especialidadeRepo.save(especialidade);

        return response.status(201).json({ especialidade: EspecialidadeView.render(especialidade) });

    }

    async showAllEspecialidades(request: Request, response: Response) {

        const especialidadeRepo = getCustomRepository(EspecialidadeRepo);

        const especialidades = await especialidadeRepo.find();

        return response.json({ especialidades: EspecialidadeView.renderMany(especialidades) })
    }

    async updateEspecialidade(request: Request, response: Response) {
        const { descricao } = request.body;

        const { id } = request.params;

        const especialidadeRepo = getCustomRepository(EspecialidadeRepo);

        const especialidade = await especialidadeRepo.findOne({ id });

        if (!especialidade) throw new AppErrors('Especialidade não existe!');

        const especToUpdate = {
            ...especialidade,
            descricao
        };

        await especialidadeRepo.save(especToUpdate);

        return response.json({ especialidade: EspecialidadeView.render(especToUpdate) });
    }

    async deleteEspecialidade(request: Request, response: Response) {
        const { id } = request.params;

        const especialidadeRepo = getCustomRepository(EspecialidadeRepo);

        const especialidade = await especialidadeRepo.findOne({ id });

        if (!especialidade) throw new AppErrors('Especialidade não existe!');

        await especialidadeRepo.delete(especialidade);

        return response.json({ message: 'Especialidade excluída com sucesso.' });

    }

    async createStatus(request: Request, response: Response) {
        const { descricao } = request.body;

        const statusRepo = getCustomRepository(StatusRepo);

        const statusExist = await statusRepo.findOne({ descricao });

        if (statusExist) throw new AppErrors('Status já existente!');

        const status = statusRepo.create({ descricao });

        await statusRepo.save(status);

        return response.status(201).json({ status: StatusView.render(status) });
    }

    async showAllStatus(request: Request, response: Response) {
        const statusRepo = getCustomRepository(StatusRepo);

        const statusList = await statusRepo.find();

        return response.json({ statusList: StatusView.renderMany(statusList) });
    }

    async updateStatus(request: Request, response: Response) {
        const { descricao } = request.body;

        const { id } = request.params;

        const statusRepo = getCustomRepository(StatusRepo);

        const status = await statusRepo.findOne({ id });

        if (!status) throw new AppErrors('Status não existe!');

        const statusToUpdate = {
            ...status,
            descricao
        };

        await statusRepo.save(statusToUpdate);

        return response.json({ status: StatusView.render(statusToUpdate) });
    }

    async deleteStatus(request: Request, response: Response) {
        const { id } = request.params;

        const statusRepo = getCustomRepository(StatusRepo);

        const status = await statusRepo.findOne({ id });

        if (!status) throw new AppErrors('Status não existe!');

        await statusRepo.delete(status);

        return response.json({ message: 'Status excluída com sucesso.' });

    }

    async createTipoConsulta(request: Request, response: Response) {
        const { descricao } = request.body;

        const tipoConsultaRepo = getCustomRepository(TipoConsultaRepo);

        const tipoConsultaExist = await tipoConsultaRepo.findOne({ descricao });

        if (tipoConsultaExist) throw new AppErrors('Tipo de Consunta já existente!');

        const tipoConsulta = tipoConsultaRepo.create({ descricao });

        await tipoConsultaRepo.save(tipoConsulta);

        return response.status(201).json({ tipoConsulta: TipoConsultaView.render(tipoConsulta) });
    }

    async showAllTipoConsultas(request: Request, response: Response) {
        const tipoConsultaRepo = getCustomRepository(TipoConsultaRepo);

        const tipoConsultaList = await tipoConsultaRepo.find();

        return response.json({ tipoConsultaList: TipoConsultaView.renderMany(tipoConsultaList) });
    }

    async updateTipoConsulta(request: Request, response: Response) {
        const { descricao } = request.body;

        const { id } = request.params;

        const tipoConsultaRepo = getCustomRepository(TipoConsultaRepo);

        const tipoConsulta = await tipoConsultaRepo.findOne({ id });

        if (!tipoConsulta) throw new AppErrors('Tipo de Consunta não existente!');

        const tipoConsultaToUpdate = {
            ...tipoConsulta,
            descricao
        }

        await tipoConsultaRepo.save(tipoConsultaToUpdate);

        return response.status(201).json({ tipoConsulta: TipoConsultaView.render(tipoConsultaToUpdate) });
    }

    async deleteTipoConsulta(request: Request, response: Response) {
        const { id } = request.params;

        const tipoConsultaRepo = getCustomRepository(TipoConsultaRepo);

        const tipoConsulta = await tipoConsultaRepo.findOne({ id });

        if (!tipoConsulta) throw new AppErrors('Tipo Consulta não existe!');

        await tipoConsultaRepo.delete(tipoConsulta);

        return response.json({ message: 'Tipo Consulta excluída com sucesso.' });

    }
}

export { ConfigController }