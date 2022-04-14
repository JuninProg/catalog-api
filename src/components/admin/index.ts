import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { Hash } from '../../providers/implementations/Hash';
import { Phone } from '../../providers/implementations/Phone';
import { AdministratorController } from './AdministratorController';
import { PostgresAdministratorsRepository } from './repositories/implementations/PostgresAdministratorsRepository';
import { CreateAdministratorUseCase } from './useCases/CreateAdministratorUseCase/CreateAdministratorUseCase';
import { DeleteAdministratorUseCase } from './useCases/DeleteAdministratorUseCase/DeleteAdministratorUseCase';
import { ListAdministratorsUseCase } from './useCases/ListAdministratorsUseCase/ListAdministratorsUseCase';
import { RestoreAdministratorUseCase } from './useCases/RestoreAdministratorUseCase/RestoreAdministratorUseCase';
import { UpdateAdministratorPasswordUseCase } from './useCases/UpdateAdministratorPasswordUseCase/UpdateAdministratorPasswordUseCase';
import { UpdateAdministratorUseCase } from './useCases/UpdateAdministratorUseCase/UpdateAdministratorUseCase';

const administratorsRepository = new PostgresAdministratorsRepository(database);

const dateManager = new DateManager();
const hash = new Hash();
const phone = new Phone();

const createAdministratorUseCase = new CreateAdministratorUseCase(
  administratorsRepository,
  dateManager,
  hash,
  phone
);

const listAdministratorsUseCase = new ListAdministratorsUseCase(
  administratorsRepository
);

const updateAdministratorUseCase = new UpdateAdministratorUseCase(
  administratorsRepository,
  dateManager,
  phone
);

const updateAdministratorPasswordUseCase =
  new UpdateAdministratorPasswordUseCase(
    administratorsRepository,
    dateManager,
    hash
  );

const deleteAdministratorUseCase = new DeleteAdministratorUseCase(
  administratorsRepository,
  dateManager
);

const restoreAdministratorUseCase = new RestoreAdministratorUseCase(
  administratorsRepository
);

const administratorController = new AdministratorController(
  createAdministratorUseCase,
  listAdministratorsUseCase,
  updateAdministratorUseCase,
  updateAdministratorPasswordUseCase,
  deleteAdministratorUseCase,
  restoreAdministratorUseCase
);

export default plugin(administratorController.handle);
