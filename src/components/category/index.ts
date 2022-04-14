import plugin from 'fastify-plugin';
import { database } from '../../config/database';
import { DateManager } from '../../providers/implementations/DateManager';
import { Aws } from '../../providers/implementations/Aws';
import { Sharp } from '../../providers/implementations/Sharp';
import { PostgresAddressRepository } from '../address/repositories/implementations/PostgresAddressRepository';
import { PostgresCustomersRepository } from '../customer/repositories/implementations/PostgresCustomersRepository';
import { PostgresIconsRepository } from '../icon/repositories/implementations/PostgresIconsRepository';
import { PostgresUsersRepository } from '../user/repositories/implementations/PostgresUsersRepository';
import { CategoryController } from './CategoryController';
import { PostgresCategoriesRepository } from './repositories/implementations/PostgresCategoriesRepository';
import { ConsultCategoryAdActionsUseCase } from './useCases/ConsultCategoryAdActionsUseCase/ConsultCategoryAdActionsUseCase';
import { ConsultCategoryAdUseCase } from './useCases/ConsultCategoryAdUseCase/ConsultCategoryAdUseCase';
import { CreateCategoryAdActionUseCase } from './useCases/CreateCategoryAdActionUseCase/CreateCategoryAdActionUseCase';
import { CreateCategoryAdAddressUseCase } from './useCases/CreateCategoryAdAddressUseCase/CreateCategoryAdAddressUseCase';
import { CreateCategoryAdFileUseCase } from './useCases/CreateCategoryAdFileUseCase/CreateCategoryAdFileUseCase';
import { CreateCategoryAdPhoneUseCase } from './useCases/CreateCategoryAdPhoneUseCase/CreateCategoryAdPhoneUseCase';
import { CreateCategoryAdUseCase } from './useCases/CreateCategoryAdUseCase/CreateCategoryAdUseCase';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase/CreateCategoryUseCase';
import { DeleteCategoryAdAddressUseCase } from './useCases/DeleteCategoryAdAddressUseCase/DeleteCategoryAdAddressUseCase';
import { DeleteCategoryAdFileUseCase } from './useCases/DeleteCategoryAdFileUseCase/DeleteCategoryAdFileUseCase';
import { DeleteCategoryAdPhoneUseCase } from './useCases/DeleteCategoryAdPhoneUseCase/DeleteCategoryAdPhoneUseCase';
import { DeleteCategoryAdUseCase } from './useCases/DeleteCategoryAdUseCase/DeleteCategoryAdUseCase';
import { DeleteCategoryUseCase } from './useCases/DeleteCategoryUseCase/DeleteCategoryUseCase';
import { FindCategoriesAdsUseCase } from './useCases/FindCategoriesAdsUseCase/FindCategoriesAdsUseCase';
import { ListCategoriesAdsUseCase } from './useCases/ListCategoriesAdsUseCase/ListCategoriesAdsUseCase';
import { ListCategoriesUseCase } from './useCases/ListCategoriesUseCase/ListCategoriesUseCase';
import { RestoreCategoryAdUseCase } from './useCases/RestoreCategoryAdUseCase/RestoreCategoryAdUseCase';
import { RestoreCategoryUseCase } from './useCases/RestoreCategoryUseCase/RestoreCategoryUseCase';
import { UpdateCategoriesAdsActionsUseCase } from './useCases/UpdateCategoriesAdsActionsUseCase/UpdateCategoriesAdsActionsUseCase';
import { UpdateCategoryAdAddressUseCase } from './useCases/UpdateCategoryAdAddressUseCase/UpdateCategoryAdAddressUseCase';
import { UpdateCategoryAdFileUseCase } from './useCases/UpdateCategoryAdFileUseCase/UpdateCategoryAdFileUseCase';
import { UpdateCategoryAdPhoneUseCase } from './useCases/UpdateCategoryAdPhoneUseCase/UpdateCategoryAdPhoneUseCase';
import { UpdateCategoryAdUseCase } from './useCases/UpdateCategoryAdUseCase/UpdateCategoryAdUseCase';
import { UpdateCategoryUseCase } from './useCases/UpdateCategoryUseCase/UpdateCategoryUseCase';

const categoriesRepository = new PostgresCategoriesRepository(database);
const addressRepository = new PostgresAddressRepository(database);
const customersRepository = new PostgresCustomersRepository(database);
const iconsRepository = new PostgresIconsRepository(database);
const usersRepository = new PostgresUsersRepository(database);

const dateManager = new DateManager();
const sharp = new Sharp();
const awsFileUploader = new Aws();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository,
  dateManager,
  addressRepository,
  iconsRepository
);

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoriesRepository,
  dateManager,
  iconsRepository
);

const deleteCategoryUseCase = new DeleteCategoryUseCase(
  categoriesRepository,
  dateManager
);

const restoreCategoryUseCase = new RestoreCategoryUseCase(categoriesRepository);

const createCategoryAdUseCase = new CreateCategoryAdUseCase(
  categoriesRepository,
  customersRepository,
  dateManager
);

const listCategoriesAdsUseCase = new ListCategoriesAdsUseCase(
  categoriesRepository
);

const updateCategoryAdUseCase = new UpdateCategoryAdUseCase(
  categoriesRepository,
  dateManager
);

const deleteCategoryAdUseCase = new DeleteCategoryAdUseCase(
  categoriesRepository,
  dateManager
);

const restoreCategoryAdUseCase = new RestoreCategoryAdUseCase(
  categoriesRepository
);

const createCategoryAdPhoneUseCase = new CreateCategoryAdPhoneUseCase(
  categoriesRepository,
  dateManager
);

const deleteCategoryAdPhoneUseCase = new DeleteCategoryAdPhoneUseCase(
  categoriesRepository,
  dateManager
);

const createCategoryAdAddressUseCase = new CreateCategoryAdAddressUseCase(
  categoriesRepository,
  dateManager,
  addressRepository
);

const deleteCategoryAdAddressUseCase = new DeleteCategoryAdAddressUseCase(
  categoriesRepository,
  dateManager
);

const consultCategoryAdUseCase = new ConsultCategoryAdUseCase(
  categoriesRepository
);

const updateCategoryAdAddressUseCase = new UpdateCategoryAdAddressUseCase(
  categoriesRepository,
  addressRepository,
  dateManager
);

const updateCategoryAdPhoneUseCase = new UpdateCategoryAdPhoneUseCase(
  categoriesRepository,
  dateManager
);

const createCategoryAdFileUseCase = new CreateCategoryAdFileUseCase(
  categoriesRepository,
  dateManager,
  sharp,
  awsFileUploader
);

const updateCategoryAdFileUseCase = new UpdateCategoryAdFileUseCase(
  categoriesRepository,
  dateManager
);

const deleteCategoryAdFileUseCase = new DeleteCategoryAdFileUseCase(
  categoriesRepository,
  dateManager,
  awsFileUploader
);

const createCategoryAdActionUseCase = new CreateCategoryAdActionUseCase(
  categoriesRepository,
  usersRepository,
  dateManager
);

const consultCategoryAdActionsUseCase = new ConsultCategoryAdActionsUseCase(
  categoriesRepository
);

const updateCategoriesAdsActionsUseCase = new UpdateCategoriesAdsActionsUseCase(
  categoriesRepository,
  dateManager
);

const findCategoriesAdsUseCase = new FindCategoriesAdsUseCase(
  categoriesRepository
);

const categoryController = new CategoryController(
  createCategoryUseCase,
  listCategoriesUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
  restoreCategoryUseCase,
  createCategoryAdUseCase,
  listCategoriesAdsUseCase,
  updateCategoryAdUseCase,
  deleteCategoryAdUseCase,
  restoreCategoryAdUseCase,
  createCategoryAdPhoneUseCase,
  deleteCategoryAdPhoneUseCase,
  createCategoryAdAddressUseCase,
  deleteCategoryAdAddressUseCase,
  consultCategoryAdUseCase,
  updateCategoryAdAddressUseCase,
  updateCategoryAdPhoneUseCase,
  createCategoryAdFileUseCase,
  updateCategoryAdFileUseCase,
  deleteCategoryAdFileUseCase,
  createCategoryAdActionUseCase,
  consultCategoryAdActionsUseCase,
  updateCategoriesAdsActionsUseCase,
  findCategoriesAdsUseCase
);

export default plugin(categoryController.handle);
