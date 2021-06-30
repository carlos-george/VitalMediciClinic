import { EntityRepository, Repository } from "typeorm";
import { Endereco } from "../models/Endereco";

@EntityRepository(Endereco)
class EnderecoRepo extends Repository<Endereco> {

}

export { EnderecoRepo }