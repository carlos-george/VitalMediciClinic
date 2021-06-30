import { Request, Response } from "express";
import { Between, getCustomRepository, In, Not, Raw } from 'typeorm';

import { AgendaRepo } from '../repositories/AgendaRepo';
import { StatusRepo } from '../repositories/StatusRepo';
import { AppErrors } from '../errors/AppErrors';
import convertHourToMinutes from "../utils/converthourToMinutes";
import { Status } from "../models/Status";

class AgendaController {

    async create(request: Request, response: Response) {
        const {
            hora,
            day,
            nomePaciente,
            nomeAcompanhante,
            telContatoPaciente,
            medEsp_id,
            status_id,
            tipoConsulta_id
        } = request.body;

        const minutes = convertHourToMinutes(hora);

        const agendaRepo = getCustomRepository(AgendaRepo);

        const statusRepo = getCustomRepository(StatusRepo);

        const statusIds = (await statusRepo.find({
            select: ['id'],
            where: {
                descricao: In(['Confirmado', 'A Confirmar'])
            }
        })).map((status: Status) => (status.id));

        const agendaExist = await agendaRepo.findOne({
            where: {
                hora: minutes,
                day,
                medico_especialidade_id: medEsp_id,
                status_id: In(statusIds)
            }
        });

        if (agendaExist) throw new AppErrors('Existe uma consulta marcada para o hórario selecionado.');

        const agenda = agendaRepo.create({
            hora: minutes,
            day,
            nomePaciente,
            nomeAcompanhante,
            telContatoPaciente,
            medicoEspecialidade: {
                id: medEsp_id
            },
            status: {
                id: status_id
            },
            tipoConsulta: {
                id: tipoConsulta_id
            }
        });

        await agendaRepo.save(agenda);

        return response.status(201).json({ agenda });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const agendaRepo = getCustomRepository(AgendaRepo);

        const agendaExist = await agendaRepo.findOne({ id });

        if (!agendaExist) throw new AppErrors('Não existe consulta marcada na agenda.');

        await agendaRepo.remove(agendaExist);

        return response.json({ message: 'Consulta excluída com sucesso.' });

    }

    async getAgendaByDay(request: Request, response: Response) {

        const { day } = request.query;

        const agendaRepo = getCustomRepository(AgendaRepo);

        const agendaExist = await agendaRepo.find({
            // day: Raw(alias => `${alias} BETWEEN :dayInit AND :dayFinal`, { dayInit: `${day} 00:00:00`, dayFinal: `${day} 23:59:59` })
            day: Raw(alias => `${alias} = :day`, { day })
        });

        if (agendaExist.length === 0) throw new AppErrors(`Não existe consulta(s) marcada(s) na agenda para ${day}.`);


        return response.json({ agenda: agendaExist });

    }

    async updateStatus(request: Request, response: Response) {
        const { status_id } = request.body;
        const { id } = request.params;

        const agendaRepo = getCustomRepository(AgendaRepo);

        const agendaExist = await agendaRepo.findOne({ id });

        if (!agendaExist) throw new AppErrors('Não existe consulta marcada na agenda.');

        const agenda = {
            ...agendaExist,
            status_id
        };

        await agendaRepo.save(agenda);

        return response.json({ agenda });
    }

}

export { AgendaController }