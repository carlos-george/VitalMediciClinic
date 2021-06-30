import { EntityRepository, Repository } from "typeorm";
import { Paciente } from "../models/Paciente";

@EntityRepository(Paciente)
class PacienteRepo extends Repository<Paciente> {

}

export { PacienteRepo }