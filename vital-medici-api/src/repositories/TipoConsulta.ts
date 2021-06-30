import { EntityRepository, Repository } from "typeorm";
import { TipoConsulta } from "../models/TipoConsulta";

@EntityRepository(TipoConsulta)
class TipoConsultaRepo extends Repository<TipoConsulta> {

}

export { TipoConsultaRepo }