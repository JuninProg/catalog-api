import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { Phone } from '../../providers/implementations/Phone';
import { PostgresUsersRepository } from './repositories/implementations/PostgresUsersRepository';
import { CreateUserUseCase } from './useCases/CreateUserUseCase/CreateUserUseCase';
import { ListUsersUseCase } from './useCases/ListUsersUseCase/ListUsersUseCase';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase/UpdateUserUseCase';
import { UserController } from './UserController';

const usersRepository = new PostgresUsersRepository(database);

const dateManager = new DateManager();
const phone = new Phone();

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  dateManager,
  phone
);

const listUsersUseCase = new ListUsersUseCase(usersRepository);

const updateUserUseCase = new UpdateUserUseCase(usersRepository, dateManager);

const userController = new UserController(
  createUserUseCase,
  listUsersUseCase,
  updateUserUseCase
);

export default plugin(userController.handle);
