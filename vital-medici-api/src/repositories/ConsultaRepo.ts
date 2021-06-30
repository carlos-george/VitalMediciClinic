import { EntityRepository, Repository } from "typeorm";
import { Consulta } from "../models/Consulta";

@EntityRepository(Consulta)
class ConsultaRepo extends Repository<Consulta> {

}

export { ConsultaRepo }