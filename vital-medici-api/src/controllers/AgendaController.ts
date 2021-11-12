import { Request, Response } from "express";
import { getCustomRepository, In, Raw } from 'typeorm';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as yup from 'yup';

import { AgendaRepo } from '../repositories/AgendaRepo';
import { MedicoEspecialidadeRepo } from "../repositories/MedicoEspecialidadeRepo";
import { StatusRepo } from '../repositories/StatusRepo';
import { AppErrors } from '../errors/AppErrors';
import { Status } from "../models/Status";
import { convertHourToMinutes, convertMinutesToHour } from "../utils/TimeUtils";

class AgendaController {

    async novaConsulta(request: Request, response: Response) {
        const {
            hora,
            day,
            nomePaciente,
            telContatoPaciente,
            medico,
            especialidade,
            status_id,
            tipoConsulta_id
        } = request.body;

        const minutes = convertHourToMinutes(hora);

        const agendaRepo = getCustomRepository(AgendaRepo);

        const medEspRepo = getCustomRepository(MedicoEspecialidadeRepo);

        const medEsp = await medEspRepo.createQueryBuilder("medEsp")
            .select("medEsp")
            .leftJoin("medEsp.medico", "medico")
            .where("medico.nome = 'Renata Vitoriano'")
            .getOne();

        if (!medEsp) throw new AppErrors('Médico não encontrado.');

        const medEspDesc = `${medico} - ${especialidade}`;

        const agenda = agendaRepo.create({
            hora: minutes,
            day,
            nomePaciente,
            nomeAcompanhante: nomePaciente,
            medEspDesc,
            telContatoPaciente,
            medicoEspecialidade: {
                id: medEsp.id
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

        const {
            day,
            medico,
            nomePaciente,
            status_id,
            tipoConsulta_id
        } = request.query;

        const agendaRepo = getCustomRepository(AgendaRepo);

        const schema = yup.object().shape({
            day: yup.string().defined("Data da Consulta é um campo obrigatório."),
        });

        try {
            await schema.validate(request.query, { abortEarly: false });
        } catch (err: any) {
            const msg = err.errors[0];
            throw new AppErrors(msg);
        }

        const agendaExist = await agendaRepo.find({
            select: [
                "id",
                "day",
                "hora",
                "nomePaciente",
                "telContatoPaciente",
                "medEspDesc",
            ],
            // day: Raw(alias => `${alias} BETWEEN :dayInit AND :dayFinal`, { dayInit: `${day} 00:00:00`, dayFinal: `${day} 23:59:59` })
            where: {
                day: Raw(alias => `${alias} = :day`, { day }),
                nomePaciente: Raw(alias => {

                    if (nomePaciente) return `LOWER(${alias}) LIKE '%${String(nomePaciente).toLowerCase()}%'`;

                    return '';
                }),
                medEspDesc: Raw(alias => {

                    if (medico) return `LOWER(${alias}) LIKE '%${String(medico).toLowerCase()}%'`;

                    return '';
                }),
                status: Raw(alias => {

                    if (status_id) return `${alias}.id = '${status_id}'`;

                    return '';
                }),
                tipoConsulta: Raw(alias => {

                    if (tipoConsulta_id) return `${alias}.id = '${tipoConsulta_id}'`;

                    return '';
                }),
            },
            relations: ["status", "tipoConsulta"]
        });

        if (day && agendaExist.length === 0) {

            const formatedDate = format(parseISO(day.toString()), 'd/MM/yyyy', { locale: ptBR });

            throw new AppErrors(`Não existe consulta(s) marcada(s) na agenda para ${formatedDate}.`);
        }

        const presentAgenda = agendaExist.map(consulta => {
            const newHour = convertMinutesToHour(consulta.hora);
            const data = {
                ...consulta,
                hora: newHour
            };

            return data;
        });

        return response.status(200).json({ agenda: presentAgenda });

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