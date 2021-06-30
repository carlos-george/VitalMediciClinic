import { EntityRepository, Repository } from "typeorm";
import { Especialidade } from "../models/Especialidade";

@EntityRepository(Especialidade)
class EspecialidadeRepo extends Repository<Especialidade> {

}

export { EspecialidadeRepo }