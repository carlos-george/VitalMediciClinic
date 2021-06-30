import { Medico } from "../models/Medico";
import MedicoEspecialidadeView from "./MedicoEspecialidadeView";


export default {
    render(medico: Medico) {

        const medEsps = medico.medicosEspecialidades ? MedicoEspecialidadeView.renderMany(medico.medicosEspecialidades) : [];
        return {
            id: medico.id,
            nome: medico.nome,
            crm: medico.crm,
            telContato: medico.telContato,
            dataNascimento: medico.dataNascimento,
            isactive: medico.isactive,
            medicosEspecialidades: medEsps,
        }
    },
    renderMany(medicos: Medico[]) {
        return medicos.map(medico => this.render(medico));
    }
}