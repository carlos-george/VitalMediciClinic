import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { StatusRepo } from "../repositories/StatusRepo";
import { TipoConsultaRepo } from "../repositories/TipoConsulta";

class PresenterController {

    async getListaStatusAndTipoConsulta(request: Request, response: Response) {

        const statusRepo = getCustomRepository(StatusRepo);
        const tipoConsultaRepo = getCustomRepository(TipoConsultaRepo);

        const listaStatus = await statusRepo.find({
            select: ['id', 'descricao'],
            where: {
                descricao: In(['Confirmado', 'A Confirmar'])
            }
        });

        const listaTipoConsulta = await tipoConsultaRepo.find({
            select: ['id', 'descricao']
        });

        return response.status(200).json({ listaStatus, listaTipoConsulta });
    }
}

export { PresenterController }