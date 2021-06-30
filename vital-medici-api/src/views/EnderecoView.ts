import { Endereco } from "../models/Endereco";

export default {
    render(endereco: Endereco) {
        return {
            id: endereco.id,
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            complemento: endereco.complemento,
            numero: endereco.numero,
        }
    },
    renderMany(enderecos: Endereco[]) {
        return enderecos.map(endereco => this.render(endereco));
    }
}