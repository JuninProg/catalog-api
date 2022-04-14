import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { Aws } from '../../providers/implementations/Aws';
import { Sharp } from '../../providers/implementations/Sharp';
import { PostgresCategoriesRepository } from '../category/repositories/implementations/PostgresCategoriesRepository';
import { IconController } from './IconController';
import { PostgresIconsRepository } from './repositories/implementations/PostgresIconsRepository';
import { CreateIconUseCase } from './useCases/CreateIconUseCase/CreateIconUseCase';
import { DeleteIconUseCase } from './useCases/DeleteIconUseCase/DeleteIconUseCase';
import { ListIconsUseCase } from './useCases/ListIconsUseCase/ListIconsUseCase';

const iconsRepository = new PostgresIconsRepository(database);
const categoriesRepository = new PostgresCategoriesRepository(database);

const sharp = new Sharp();
const awsFileUploader = new Aws();
const dateManager = new DateManager();

const createIconUseCase = new CreateIconUseCase(
  sharp,
  awsFileUploader,
  dateManager,
  iconsRepository
);

const listIconsUseCase = new ListIconsUseCase(iconsRepository);

const deleteIconUseCase = new DeleteIconUseCase(
  iconsRepository,
  dateManager,
  awsFileUploader,
  categoriesRepository
);

const iconController = new IconController(
  createIconUseCase,
  listIconsUseCase,
  deleteIconUseCase
);

export default plugin(iconController.handle);
