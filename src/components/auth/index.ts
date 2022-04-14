import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { Hash } from '../../providers/implementations/Hash';
import { Phone } from '../../providers/implementations/Phone';
import { TokenProvider } from '../../providers/implementations/TokenProvider';
import { PostgresAdministratorsRepository } from '../admin/repositories/implementations/PostgresAdministratorsRepository';
import { PostgresCustomersRepository } from '../customer/repositories/implementations/PostgresCustomersRepository';
import { PostgresUsersRepository } from '../user/repositories/implementations/PostgresUsersRepository';
import { AuthController } from './AuthController';
import { AdminLoginUseCase } from './useCases/AdminLoginUseCase/AdminLoginUseCase';
import { CustomerLoginUseCase } from './useCases/CustomerLoginUseCase/CustomerLoginUseCase';
import { TokenAuthUseCase } from './useCases/TokenAuthUseCase/TokenAuthUseCase';
import { UserLoginUseCase } from './useCases/UserLoginUseCase/UserLoginUseCase';

const administratorsRepository = new PostgresAdministratorsRepository(database);
const usersRepository = new PostgresUsersRepository(database);
const customersRepository = new PostgresCustomersRepository(database);

const tokenProvider = new TokenProvider();
const hash = new Hash();
const phone = new Phone();

const tokenAuthUseCase = new TokenAuthUseCase(tokenProvider);

const adminLoginUseCase = new AdminLoginUseCase(
  tokenProvider,
  administratorsRepository,
  hash
);

const userLoginUseCase = new UserLoginUseCase(
  usersRepository,
  tokenProvider,
  phone
);

const customerLoginUseCase = new CustomerLoginUseCase(
  tokenProvider,
  customersRepository,
  hash
);

const authController = new AuthController(
  tokenAuthUseCase,
  adminLoginUseCase,
  userLoginUseCase,
  customerLoginUseCase
);

export default plugin(authController.handle);
