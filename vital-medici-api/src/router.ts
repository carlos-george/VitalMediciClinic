import { Router } from 'express';

import auth, { UserReq } from './middlewares/auth';
import { UserController } from './controllers/UserController';
import { RoleController } from './controllers/RoleController';
import { ConfigController } from './controllers/ConfigController';
import { MedicoController } from './controllers/MedicoController';
import { AgendaController } from './controllers/AgendaController';
import { PacienteController } from './controllers/PacienteController';

declare global {
    namespace Express {
        interface Request {
            user: UserReq
        }
    }
}

const userController = new UserController();
const roleController = new RoleController();

const configController = new ConfigController();

const medicoController = new MedicoController();

const agendaController = new AgendaController();

const pacienteController = new PacienteController();

const router = Router();

//Users
router.post('/users', auth, userController.create);
router.put('/generate-pass/:id', auth, userController.generatepass);
router.put('/reset-pass/:id', auth, userController.resetPassword);
router.put('/users-active-desactive/:id', auth, userController.activeDesactiveUser);
router.put('/users', auth, userController.update);
router.post('/users/authenticate', userController.authenticate);
router.get('/users-profile', auth, userController.getUser);
router.get('/users', auth, userController.showAll);

// Roles
router.get('/roles', auth, roleController.showAll);

// Configs
router.get('/config/especialidades', auth, configController.showAllEspecialidades);
router.put('/config/especialidades/:id', auth, configController.updateEspecialidade);
router.post('/config/especialidades', auth, configController.createEspecialidade);
router.delete('/config/especialidades/:id', auth, configController.deleteEspecialidade);
router.get('/config/status', auth, configController.showAllStatus);
router.post('/config/status', auth, configController.createStatus);
router.put('/config/status/:id', auth, configController.updateStatus);
router.delete('/config/status/:id', auth, configController.deleteStatus);
router.get('/config/tipo-consultas', auth, configController.showAllTipoConsultas);
router.post('/config/tipo-consultas', auth, configController.createTipoConsulta);
router.put('/config/tipo-consultas/:id', auth, configController.updateTipoConsulta);
router.delete('/config/tipo-consultas/:id', auth, configController.deleteTipoConsulta);

// Medicos
router.get('/medicos/:id', auth, medicoController.getMedico);
router.get('/medicos', auth, medicoController.getAll);
router.post('/medicos', auth, medicoController.create);
router.put('/medicos/:id', auth, medicoController.update);

// Agenda
router.post('/agendas', auth, agendaController.create);
router.delete('/agendas/:id', auth, agendaController.delete);
router.get('/agendas-day', auth, agendaController.getAgendaByDay);
router.put('/agendas-status/:id', auth, agendaController.updateStatus);

// Paciente

router.post('/pacientes', auth, pacienteController.create);

export { router }