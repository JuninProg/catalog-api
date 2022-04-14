import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { ContactController } from './ContractController';
import { PostgresContactsRepository } from './repositories/implementations/PostgresContactsRepository';
import { CreateContactUseCase } from './useCases/CreateContactUseCase/CreateContactUseCase';
import { ListContactsUseCase } from './useCases/ListContactsUseCase/ListContactsUseCase';

const contactsRepository = new PostgresContactsRepository(database);

const dateManager = new DateManager();

const createContactUseCase = new CreateContactUseCase(
  contactsRepository,
  dateManager
);

const listContactsUseCase = new ListContactsUseCase(contactsRepository);

const contactController = new ContactController(
  createContactUseCase,
  listContactsUseCase
);

export default plugin(contactController.handle);
