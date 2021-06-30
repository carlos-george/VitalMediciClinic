import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { AppErrors } from "../errors/AppErrors";
import { PacienteRepo } from "../repositories/PacienteRepo";
import PacienteView from "../views/PacienteView";

class PacienteController {

    async create(request: Request, response: Response) {
        const {
            nome,
            documento,
            datanascimento,
            telContato,
            endereco
        } = request.body;

        const pacienteRepo = getCustomRepository(PacienteRepo);

        const pacienteExist = await pacienteRepo.findOne({ documento });

        if (pacienteExist) throw new AppErrors('Paciente já existente.');

        const paciente = pacienteRepo.create({
            nome,
            documento,
            datanascimento,
            telContato,
            endereco
        });

        await pacienteRepo.save(paciente);

        return response.status(201).json({ paciente: PacienteView.render(paciente) });
    }

}

export { PacienteController }