import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { BrasilAPI } from '../../providers/implementations/BrasilAPI/BrasilAPI';
import { DateManager } from '../../providers/implementations/DateManager';
import { PostgresCategoriesRepository } from '../category/repositories/implementations/PostgresCategoriesRepository';
import { AddressController } from './AddressController';
import { PostgresAddressRepository } from './repositories/implementations/PostgresAddressRepository';
import { ConsultAddressUseCase } from './useCases/ConsultAddressUseCase/ConsultAddressUseCase';
import { CreateAddressUseCase } from './useCases/CreateAddressUseCase/CreateAddressUseCase';
import { DeleteAddressUseCase } from './useCases/DeleteAddressUseCase/DeleteAddressUseCase';
import { ListAddressesUseCase } from './useCases/ListAddressesUseCase/ListAddressesUseCase';
import { RestoreAddressUseCase } from './useCases/RestoreAddressUseCase/RestoreAddressUseCase';
import { UpdateAddressUseCase } from './useCases/UpdateAddressUseCase/UpdateAddressUseCase';

const addressRepository = new PostgresAddressRepository(database);
const categoriesRepository = new PostgresCategoriesRepository(database);

const brasilAPI = new BrasilAPI();
const dateManager = new DateManager();

const consultAddressUseCase = new ConsultAddressUseCase(brasilAPI);

const createAddressUseCase = new CreateAddressUseCase(
  addressRepository,
  dateManager
);

const updateAddressUseCase = new UpdateAddressUseCase(
  addressRepository,
  dateManager
);

const listAddressesUseCase = new ListAddressesUseCase(addressRepository);

const deleteAddressUseCase = new DeleteAddressUseCase(
  addressRepository,
  dateManager,
  categoriesRepository
);

const restoreAddressUseCase = new RestoreAddressUseCase(addressRepository);

const addressController = new AddressController(
  consultAddressUseCase,
  createAddressUseCase,
  updateAddressUseCase,
  listAddressesUseCase,
  deleteAddressUseCase,
  restoreAddressUseCase
);

export default plugin(addressController.handle);
