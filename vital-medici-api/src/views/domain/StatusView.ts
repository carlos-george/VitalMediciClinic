import { Status } from "../../models/Status";

export default {

    render(status: Status) {
        return {
            id: status.id,
            descricao: status.descricao,
        }
    },
    renderMany(statuss: Status[]) {
        return statuss.map(status => this.render(status));
    },
}