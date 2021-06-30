import { Paciente } from "../models/Paciente";
import EnderecoView from "./EnderecoView";

export default {
    render(paciente: Paciente) {
        return {
            id: paciente.id,
            nome: paciente.nome,
            documento: paciente.documento,
            datanascimento: paciente.datanascimento,
            telContato: paciente.telContato,
            endereco: paciente.endereco ? EnderecoView.render(paciente.endereco) : {},

        };
    },
    renderMany(pacientes: Paciente[]) {
        return pacientes.map(paciente => this.render(paciente));
    }
}