import { EntityRepository, Repository } from "typeorm"
import { Medico } from "../models/Medico"


@EntityRepository(Medico)
class MedicoRepository extends Repository<Medico> {

}

export { MedicoRepository };