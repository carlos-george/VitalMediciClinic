import { Request, Response } from "express";

class ConsultaController {

    async create(request: Request, response: Response) {

        const {
            id_paciente,
            id_medicoEspecialidade,
            id_status,
            id_tipoConsulta
        } = request.body;
    }
}

export { ConsultaController }