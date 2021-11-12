import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import { AppErrors } from '../errors/AppErrors';
import UserView from "../views/UserView";
import { getCustomRepository, Raw } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { RolesRepository } from "../repositories/RolesRepositorys";


const generateToken = (params = {}) => {
    return jwt.sign(params,
        process.env.JWT_KEY!,
        {
            // 24hrs
            expiresIn: 86400
            // 4hrs
            // expiresIn: 14400
            // expiresIn: 2

        });
}

class UserController {

    async create(request: Request, response: Response) {

        const { firstname, lastname, username, password, datebirth, role_id } = request.body;

        const schema = yup.object().shape({
            firstname: yup.string().defined("Primeiro nome é um campo obrigatório."),
            lastname: yup.string().defined("Último nome é um campo obrigatório."),
            username: yup.string().defined("Nome de Usuário é um campo obrigatório."),
            datebirth: yup.string().defined("Data de Nascimento é um campo obrigatório."),
            password: yup.string().defined("Senha é um campo obrigatório."),
            role_id: yup.string().defined("Permissão é um campo obrigatório."),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err: any) {
            const msg = err.errors[0];
            throw new AppErrors(msg);
        }

        const passHash = await bcrypt.hash(password, 10);

        const userRepository = getCustomRepository(UsersRepository);
        const roleRepository = getCustomRepository(RolesRepository);

        const userAlreadyExists = await userRepository.findOne({ username });

        if (userAlreadyExists) throw new AppErrors('Usuário já existente!');

        const role = await roleRepository.findOne({ id: role_id });

        const user = userRepository.create({
            firstname,
            lastname,
            username,
            password: passHash,
            datebirth,
            role
        });

        await userRepository.save(user);

        return response.status(201).json({ user: UserView.render(user) });

    }

    async update(request: Request, response: Response) {

        const { id, firstname, lastname, username, datebirth, role_id } = request.body;

        const schema = yup.object().shape({
            firstname: yup.string().defined("Primeiro nome é um campo obrigatório."),
            lastname: yup.string().defined("Último nome é um campo obrigatório."),
            username: yup.string().defined("Nome de Usuário é um campo obrigatório."),
            datebirth: yup.string().defined("Data de Nascimento é um campo obrigatório."),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err: any) {
            const msg = err.errors[0];
            throw new AppErrors(msg);
        }

        const userRepository = getCustomRepository(UsersRepository);
        const roleRepository = getCustomRepository(RolesRepository);

        const user = await userRepository.findOne({ id });

        if (!user) throw new AppErrors('Usuário não existe!');

        const role = await roleRepository.findOne({ id: role_id });

        if (!role) throw new AppErrors('Selecione um perfil de usuário');

        const userUpdated = {
            ...user,
            firstname: firstname,
            lastname: lastname,
            username: username,
            datebirth: datebirth,
            role: role,
        };

        await userRepository.save(userUpdated);

        return response.status(200).json({ user: UserView.render(userUpdated) });

    }

    async resetPassword(request: Request, response: Response) {
        const { current, newpass } = request.body;
        const { id } = request.params;

        const schema = yup.object().shape({
            current: yup.string().defined("Senha atual é um campo obrigatório."),
            newpass: yup.string().defined("Nova senha é um campo obrigatório."),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err: any) {
            const msg = err.errors[0];
            throw new AppErrors(msg);
        }

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({ id });

        if (!user) throw new AppErrors('Usuário não existe!');

        if (!await bcrypt.compare(current, user.password)) throw new AppErrors('Senha inválida para o usuário.');

        const passHash = await bcrypt.hash(newpass, 10);

        const userUpdated = {
            ...user,
            password: passHash
        };

        await userRepository.save(userUpdated);

        return response.status(200).json({ user: UserView.render(userUpdated) });

    }

    async generatepass(request: Request, response: Response) {

        const { id } = request.params;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({ id });

        if (!user) throw new AppErrors('Usuário não existe!');

        const data = String(user.datebirth).split('-');

        const newpass = `${data[2]}${data[1]}${data[0]}`;

        const passHash = await bcrypt.hash(newpass, 10);

        const userUpdated = {
            ...user,
            password: passHash
        };

        await userRepository.save(userUpdated);

        return response.status(200).json({ user: UserView.render(userUpdated) });

    }

    async activeDesactiveUser(request: Request, response: Response) {

        const { id } = request.params;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({ id });

        if (!user) throw new AppErrors('Usuário não existe!');

        const userUpdated = {
            ...user,
            isactive: !user.isactive
        };

        await userRepository.save(userUpdated);

        return response.status(200).json({ user: UserView.render(userUpdated) });
    }

    async authenticate(request: Request, response: Response) {

        const { username, password } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne(
            {
                where: {
                    username
                },
                relations: ['role']
            });

        if (!userAlreadyExists) throw new AppErrors('Usuário não existe!');

        if (!await bcrypt.compare(password, userAlreadyExists.password)) throw new AppErrors('Senha inválida para o usuário.');

        return response.json({ user: UserView.render(userAlreadyExists), token: generateToken({ id: userAlreadyExists.id }) });

    }

    async getUser(request: Request, response: Response) {

        const { id } = request.user;

        const userRepository = getCustomRepository(UsersRepository);

        const userExists = await userRepository.findOne({
            where: {
                id,
            },
            relations: ['role']
        });

        if (!userExists) throw new AppErrors('Usuário não existe!');

        return response.json({ user: UserView.render(userExists) });

    }

    async showAll(request: Request, response: Response) {
        const { username } = request.query;

        const userRepository = getCustomRepository(UsersRepository);

        const listUsers = await userRepository.find({
            where: {
                issystemadmin: false,
                username: Raw(alias => {

                    if (username) return `${alias} LIKE '${username}%'`;

                    return '';
                })
            },
            relations: ['role']
        });

        return response.json({ users: UserView.renderMany(listUsers) });
    }
}

export { UserController };
