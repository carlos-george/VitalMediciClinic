import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { RolesRepository } from '../repositories/RolesRepositorys';
import RoleView from '../views/RoleView';


class RoleController {

    async showAll(request: Request, response: Response) {

        const roleRepository = getCustomRepository(RolesRepository);

        const roles = await roleRepository.find();

        return response.status(200).json({ roles: RoleView.renderMany(roles) });
    }
}

export { RoleController }