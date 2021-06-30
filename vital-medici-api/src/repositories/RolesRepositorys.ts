import { EntityRepository, Repository } from "typeorm"
import { Role } from "../models/Role"


@EntityRepository(Role)
class RolesRepository extends Repository<Role> {

}

export { RolesRepository };