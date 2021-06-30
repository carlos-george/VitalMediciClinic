import { Especialidade } from "../../models/Especialidade";

export default {

    render(especialidade: Especialidade) {
        return {
            id: especialidade.id,
            descricao: especialidade.descricao,
        }
    },
    renderMany(especialidades: Especialidade[]) {
        return especialidades.map(especialidade => this.render(especialidade));
    },
}