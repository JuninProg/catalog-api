import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { Hash } from '../../providers/implementations/Hash';
import { Phone } from '../../providers/implementations/Phone';
import { CustomerController } from './CustomerController';
import { PostgresCustomersRepository } from './repositories/implementations/PostgresCustomersRepository';
import { CreateCustomerUseCase } from './useCases/CreateCustomerUseCase/CreateCustomerUseCase';
import { DeleteCustomerUseCase } from './useCases/DeleteCustomerUseCase/DeleteCustomerUseCase';
import { ListCustomersUseCase } from './useCases/ListCustomersUseCase/ListCustomersUseCase';
import { RestoreCustomerUseCase } from './useCases/RestoreCustomerUseCase/RestoreCustomerUseCase';
import { UpdateCustomerPasswordUseCase } from './useCases/UpdateCustomerPasswordUseCase/UpdateCustomerPasswordUseCase';
import { UpdateCustomerUseCase } from './useCases/UpdateCustomerUseCase/UpdateCustomerUseCase';

const customersRepository = new PostgresCustomersRepository(database);

const dateManager = new DateManager();
const hash = new Hash();
const phone = new Phone();

const createCustomerUseCase = new CreateCustomerUseCase(
  customersRepository,
  dateManager,
  hash,
  phone
);

const listCustomersUseCase = new ListCustomersUseCase(customersRepository);

const updateCustomerUseCase = new UpdateCustomerUseCase(
  customersRepository,
  dateManager
);

const updateCustomerPasswordUseCase = new UpdateCustomerPasswordUseCase(
  customersRepository,
  dateManager,
  hash
);

const deleteCustomerUseCase = new DeleteCustomerUseCase(
  customersRepository,
  dateManager
);

const restoreCustomerUseCase = new RestoreCustomerUseCase(customersRepository);

const customerController = new CustomerController(
  createCustomerUseCase,
  listCustomersUseCase,
  updateCustomerUseCase,
  updateCustomerPasswordUseCase,
  deleteCustomerUseCase,
  restoreCustomerUseCase
);

export default plugin(customerController.handle);
