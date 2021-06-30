import { EntityRepository, Repository } from "typeorm";
import { MedicoEspecialidade } from "../models/MedicoEspecialidade";

@EntityRepository(MedicoEspecialidade)
class MedicoEspecialidadeRepo extends Repository<MedicoEspecialidade> {

}

export { MedicoEspecialidadeRepo }