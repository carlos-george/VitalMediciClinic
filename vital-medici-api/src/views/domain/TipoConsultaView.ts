import { TipoConsulta } from "../../models/TipoConsulta";

export default {

    render(tipoConsulta: TipoConsulta) {
        return {
            id: tipoConsulta.id,
            descricao: tipoConsulta.descricao,
        }
    },
    renderMany(tipoConsultas: TipoConsulta[]) {
        return tipoConsultas.map(tipoConsulta => this.render(tipoConsulta));
    },
}