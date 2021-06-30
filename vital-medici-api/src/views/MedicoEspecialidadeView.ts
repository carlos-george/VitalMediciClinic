import { MedicoEspecialidade } from "../models/MedicoEspecialidade";
import EspecialidadeView from "./domain/EspecialidadeView";

export default {
    render(medEsp: MedicoEspecialidade) {
        return {
            id: medEsp.id,
            valor: medEsp.valor,
            especialidade: EspecialidadeView.render(medEsp.especialidade),
        }
    },
    renderMany(medEsps: MedicoEspecialidade[]) {
        return medEsps.map(medEsp => this.render(medEsp));
    }
}