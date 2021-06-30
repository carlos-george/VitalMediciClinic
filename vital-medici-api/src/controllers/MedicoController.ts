import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { AppErrors } from "../errors/AppErrors";
import { MedicoEspecialidade } from "../models/MedicoEspecialidade";
import { MedicoEspecialidadeRepo } from "../repositories/MedicoEspecialidadeRepo";
import { MedicoRepository } from "../repositories/MedicoRepository";
import MedicoView from "../views/MedicoView";


class MedicoController {

    async create(request: Request, response: Response) {

        const {
            nome,
            crm,
            telContato,
            dataNascimento,
            medicosEspecialidades
        } = request.body;

        const medicoRepo = getCustomRepository(MedicoRepository);

        const medicoExist = await medicoRepo.findOne({ crm });

        if (medicoExist) throw new AppErrors('Médico já existe!');

        const medico = medicoRepo.create({
            nome,
            crm,
            telContato,
            dataNascimento,
            medicosEspecialidades
        });

        await medicoRepo.save(medico);

        return response.status(201).json({ medico: MedicoView.render(medico) });
    }

    async getMedico(request: Request, response: Response) {

        const { id } = request.params;

        const medicoRepo = getCustomRepository(MedicoRepository);

        const medicoExist = await medicoRepo.findOne({
            where: { id },
            // relations: ['medicosEspecialidades']
            join: {
                alias: 'medico',
                leftJoinAndSelect: {
                    medicosEspecialidades: 'medico.medicosEspecialidades',
                    especialidade: 'medicosEspecialidades.especialidade',
                }
            }
        });

        if (!medicoExist) throw new AppErrors('Médico não existe!');

        return response.json({ medicos: MedicoView.render(medicoExist) });
        // return response.json({ medicoExist });

    }

    async update(request: Request, response: Response) {

        const {
            nome,
            crm,
            telContato,
            dataNascimento,
            isactive,
            medicosEspecialidades
        } = request.body;

        const { id } = request.params;

        const medicoRepo = getCustomRepository(MedicoRepository);

        const medicoExist = await medicoRepo.findOne({
            where: { id },
            // relations: ['medicosEspecialidades']
            join: {
                alias: 'medico',
                leftJoinAndSelect: {
                    medicosEspecialidades: 'medico.medicosEspecialidades',
                    especialidade: 'medicosEspecialidades.especialidade',
                }
            }
        });

        if (!medicoExist) throw new AppErrors('Médico não existe!');

        const medico = {
            ...medicoExist,
            nome,
            crm,
            telContato,
            dataNascimento,
            isactive,
            medicosEspecialidades
        };

        await medicoRepo.save(medico);

        const medicoAfterUpdate = await medicoRepo.findOne({
            where: { id },
            // relations: ['medicosEspecialidades']
            join: {
                alias: 'medico',
                leftJoinAndSelect: {
                    medicosEspecialidades: 'medico.medicosEspecialidades',
                    especialidade: 'medicosEspecialidades.especialidade',
                }
            }
        });

        return response.status(200).json({ medico: MedicoView.render(medicoAfterUpdate ? medicoAfterUpdate : medico) });
    }

    async getAll(request: Request, response: Response) {

        const medicoRepo = getCustomRepository(MedicoRepository);

        const medicos = await medicoRepo.find();

        console.log('Medicos: ', medicos);

        return response.json({ medicos: MedicoView.renderMany(medicos) });
    }
}
export { MedicoController }