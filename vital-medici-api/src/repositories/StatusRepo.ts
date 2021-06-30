import { EntityRepository, Repository } from "typeorm";
import { Status } from "../models/Status";

@EntityRepository(Status)
class StatusRepo extends Repository<Status> {

}

export { StatusRepo }