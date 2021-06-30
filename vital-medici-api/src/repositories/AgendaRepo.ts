import { EntityRepository, Repository } from "typeorm";
import { Agenda } from "../models/Agenda";

@EntityRepository(Agenda)
class AgendaRepo extends Repository<Agenda> {

}

export { AgendaRepo }