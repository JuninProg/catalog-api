import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError, HttpStatusCodes } from '../../errors/HttpError';
import {
  deleteCategoryAdAddressSchema,
  deleteCategoryAdFileSchema,
  deleteCategoryAdPhoneSchema,
  deleteCategoryAdSchema,
  deleteCategorySchema,
  getCategoriesAdsActionsSchema,
  getCategoriesAdsSchema,
  getCategoriesSchema,
  getCategoryAdSchema,
  getFindCategoriesAdsSchema,
  postCategoriesAdsActionsSchema,
  postCategoriesAdsActionsUpdateSchema,
  postCategoriesAdsAddressesSchema,
  postCategoriesAdsAddressesUpdateSchema,
  postCategoriesAdsFilesSchema,
  postCategoriesAdsFilesUpdateSchema,
  postCategoriesAdsPhonesSchema,
  postCategoriesAdsPhonesUpdateSchema,
  postCategoriesAdsSchema,
  postCategoriesAdsUpdateSchema,
  postCategoriesSchema,
  postCategoriesUpdateSchema,
  restoreCategoryAdSchema,
  restoreCategorySchema,
} from './Schemas';
import { ConsultCategoryAdActionsUseCase } from './useCases/ConsultCategoryAdActionsUseCase/ConsultCategoryAdActionsUseCase';
import { IConsultCategoryAdActionsDTO } from './useCases/ConsultCategoryAdActionsUseCase/IConsultCategoryAdActionsDTO';
import { ConsultCategoryAdUseCase } from './useCases/ConsultCategoryAdUseCase/ConsultCategoryAdUseCase';
import { CreateCategoryAdActionUseCase } from './useCases/CreateCategoryAdActionUseCase/CreateCategoryAdActionUseCase';
import { ICreateCategoryAdActionDTO } from './useCases/CreateCategoryAdActionUseCase/ICreateCategoryAdActionDTO';
import { CreateCategoryAdAddressUseCase } from './useCases/CreateCategoryAdAddressUseCase/CreateCategoryAdAddressUseCase';
import { ICreateCategoryAdAddressRequestDTO } from './useCases/CreateCategoryAdAddressUseCase/ICreateCategoryAdAddressDTO';
import { CreateCategoryAdFileUseCase } from './useCases/CreateCategoryAdFileUseCase/CreateCategoryAdFileUseCase';
import { CreateCategoryAdPhoneUseCase } from './useCases/CreateCategoryAdPhoneUseCase/CreateCategoryAdPhoneUseCase';
import { ICreateCategoryAdPhoneDTO } from './useCases/CreateCategoryAdPhoneUseCase/ICreateCategoryAdPhoneDTO';
import { CreateCategoryAdUseCase } from './useCases/CreateCategoryAdUseCase/CreateCategoryAdUseCase';
import { ICreateCategoryAdDTO } from './useCases/CreateCategoryAdUseCase/ICreateCategoryAdDTO';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase/CreateCategoryUseCase';
import { ICreateCategoryDTO } from './useCases/CreateCategoryUseCase/ICreateCategoryDTO';
import { DeleteCategoryAdAddressUseCase } from './useCases/DeleteCategoryAdAddressUseCase/DeleteCategoryAdAddressUseCase';
import { DeleteCategoryAdFileUseCase } from './useCases/DeleteCategoryAdFileUseCase/DeleteCategoryAdFileUseCase';
import { DeleteCategoryAdPhoneUseCase } from './useCases/DeleteCategoryAdPhoneUseCase/DeleteCategoryAdPhoneUseCase';
import { DeleteCategoryAdUseCase } from './useCases/DeleteCategoryAdUseCase/DeleteCategoryAdUseCase';
import { DeleteCategoryUseCase } from './useCases/DeleteCategoryUseCase/DeleteCategoryUseCase';
import { FindCategoriesAdsUseCase } from './useCases/FindCategoriesAdsUseCase/FindCategoriesAdsUseCase';
import { IFindCategoriesAdsFilterDTO } from './useCases/FindCategoriesAdsUseCase/IFindCategoriesAdsDTO';
import { ListCategoriesAdsUseCase } from './useCases/ListCategoriesAdsUseCase/ListCategoriesAdsUseCase';
import { IListCategoriesFilterDTO } from './useCases/ListCategoriesUseCase/IListCategoryDTO';
import { ListCategoriesUseCase } from './useCases/ListCategoriesUseCase/ListCategoriesUseCase';
import { RestoreCategoryAdUseCase } from './useCases/RestoreCategoryAdUseCase/RestoreCategoryAdUseCase';
import { RestoreCategoryUseCase } from './useCases/RestoreCategoryUseCase/RestoreCategoryUseCase';
import { IUpdateCategoriesAdsActionsDTO } from './useCases/UpdateCategoriesAdsActionsUseCase/IUpdateCategoriesAdsActionsDTO';
import { UpdateCategoriesAdsActionsUseCase } from './useCases/UpdateCategoriesAdsActionsUseCase/UpdateCategoriesAdsActionsUseCase';
import { IUpdateCategoryAdAddressRequestDTO } from './useCases/UpdateCategoryAdAddressUseCase/IUpdateCategoryAdAddressDTO';
import { UpdateCategoryAdAddressUseCase } from './useCases/UpdateCategoryAdAddressUseCase/UpdateCategoryAdAddressUseCase';
import { IUpdateCategoryAdFileDTO } from './useCases/UpdateCategoryAdFileUseCase/IUpdateCategoryAdFileDTO';
import { UpdateCategoryAdFileUseCase } from './useCases/UpdateCategoryAdFileUseCase/UpdateCategoryAdFileUseCase';
import { IUpdateCategoryAdPhoneDTO } from './useCases/UpdateCategoryAdPhoneUseCase/IUpdateCategoryAdPhoneDTO';
import { UpdateCategoryAdPhoneUseCase } from './useCases/UpdateCategoryAdPhoneUseCase/UpdateCategoryAdPhoneUseCase';
import { IUpdateCategoryAdDTO } from './useCases/UpdateCategoryAdUseCase/IUpdateCategoryAdDTO';
import { UpdateCategoryAdUseCase } from './useCases/UpdateCategoryAdUseCase/UpdateCategoryAdUseCase';
import { IUpdateCategoryDTO } from './useCases/UpdateCategoryUseCase/IUpdateCategoryDTO';
import { UpdateCategoryUseCase } from './useCases/UpdateCategoryUseCase/UpdateCategoryUseCase';

const ADS_FILES_MAX_SIZE_IN_BYTES = process.env.ADS_FILES_MAX_SIZE_IN_BYTES
  ? parseInt(process.env.ADS_FILES_MAX_SIZE_IN_BYTES)
  : 104857600;

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private restoreCategoryUseCase: RestoreCategoryUseCase,
    private createCategoryAdUseCase: CreateCategoryAdUseCase,
    private listCategoriesAdsUseCase: ListCategoriesAdsUseCase,
    private updateCategoryAdUseCase: UpdateCategoryAdUseCase,
    private deleteCategoryAdUseCase: DeleteCategoryAdUseCase,
    private restoreCategoryAdUseCase: RestoreCategoryAdUseCase,
    private createCategoryAdPhoneUseCase: CreateCategoryAdPhoneUseCase,
    private deleteCategoryAdPhoneUseCase: DeleteCategoryAdPhoneUseCase,
    private createCategoryAdAddressUseCase: CreateCategoryAdAddressUseCase,
    private deleteCategoryAdAddressUseCase: DeleteCategoryAdAddressUseCase,
    private consultCategoryAdUseCase: ConsultCategoryAdUseCase,
    private updateCategoryAdAddressUseCase: UpdateCategoryAdAddressUseCase,
    private updateCategoryAdPhoneUseCase: UpdateCategoryAdPhoneUseCase,
    private createCategoryAdFileUseCase: CreateCategoryAdFileUseCase,
    private updateCategoryAdFileUseCase: UpdateCategoryAdFileUseCase,
    private deleteCategoryAdFileUseCase: DeleteCategoryAdFileUseCase,
    private createCategoryAdActionUseCase: CreateCategoryAdActionUseCase,
    private consultCategoryAdActionsUseCase: ConsultCategoryAdActionsUseCase,
    private updateCategoriesAdsActionsUseCase: UpdateCategoriesAdsActionsUseCase,
    private findCategoriesAdsUseCase: FindCategoriesAdsUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/categories',
      { schema: postCategoriesSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as ICreateCategoryDTO;

          const category = await this.createCategoryUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: category.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/categories',
      { schema: getCategoriesSchema },
      async (request, reply) => {
        try {
          const data = request.query as Pick<
            IListCategoriesFilterDTO,
            'lat' | 'long' | 'nonDeleted' | 'page' | 'limit'
          >;

          const categories = await this.listCategoriesUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categories;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CATEGORIES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/:id',
      { schema: postCategoriesUpdateSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateCategoryDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const category = await this.updateCategoryUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return category;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/categories/:id',
      { schema: deleteCategorySchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const category = await this.deleteCategoryUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return category;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CATEGORIES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/:id/restore',
      { schema: restoreCategorySchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const category = await this.restoreCategoryUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return category;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_RESTORE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/:id/ads',
      { schema: postCategoriesAdsSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<ICreateCategoryAdDTO, 'categoryId'>;

          const categoryAd = await this.createCategoryAdUseCase.execute(
            { ...data, categoryId: params['id'] as number },
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: categoryAd.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id',
      { schema: postCategoriesAdsUpdateSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as IUpdateCategoryAdDTO;

          const categoryAd = await this.updateCategoryAdUseCase.execute(
            { ...data, id: params['id'] as number },
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAd;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/categories/:id/ads',
      { schema: getCategoriesAdsSchema },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAds = await this.listCategoriesAdsUseCase.execute({
            categoryId: params['id'] as number,
          });

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { categoryAds };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CATEGORIES_ADS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/categories/ads/:id',
      { schema: deleteCategoryAdSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAd = await this.deleteCategoryAdUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAd;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CATEGORIES_ADS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id/restore',
      { schema: restoreCategoryAdSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAd = await this.restoreCategoryAdUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAd;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_RESTORE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id/phones',
      { schema: postCategoriesAdsPhonesSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<
            ICreateCategoryAdPhoneDTO,
            'categoryAdId'
          >;

          const categoryAdPhone =
            await this.createCategoryAdPhoneUseCase.execute(
              {
                categoryAdId: params['id'] as number,
                ...data,
              },
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: categoryAdPhone.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_PHONES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/categories/ads/phones/:id',
      { schema: deleteCategoryAdPhoneSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAdPhone =
            await this.deleteCategoryAdPhoneUseCase.execute(
              params['id'] as number,
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdPhone;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CATEGORIES_ADS_PHONES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id/addresses',
      { schema: postCategoriesAdsAddressesSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<
            ICreateCategoryAdAddressRequestDTO,
            'categoryAdId'
          >;

          const categoryAdAddress =
            await this.createCategoryAdAddressUseCase.execute(
              { ...data, categoryAdId: params['id'] as number },
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: categoryAdAddress.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_ADDRESSES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/categories/ads/addresses/:id',
      { schema: deleteCategoryAdAddressSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAdAddress =
            await this.deleteCategoryAdAddressUseCase.execute(
              params['id'] as number,
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdAddress;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CATEGORIES_ADS_ADDRESSES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/categories/ads/:id',
      { schema: getCategoryAdSchema },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAd = await this.consultCategoryAdUseCase.execute(
            params['id'] as number
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAd;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CATEGORY_AD: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/addresses/:id',
      {
        schema: postCategoriesAdsAddressesUpdateSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<
            IUpdateCategoryAdAddressRequestDTO,
            'id'
          >;

          const categoryAdAddress =
            await this.updateCategoryAdAddressUseCase.execute(
              {
                ...data,
                id: params['id'] as number,
              },
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdAddress;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(
            `POST_CATEGORIES_AD_ADDRESSES_UPDATE: ${errorMessage}.`
          );
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/phones/:id',
      {
        schema: postCategoriesAdsPhonesUpdateSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<IUpdateCategoryAdPhoneDTO, 'id'>;

          const categoryAdPhone =
            await this.updateCategoryAdPhoneUseCase.execute(
              {
                ...data,
                id: params['id'] as number,
              },
              request.admin,
              request.customer
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdPhone;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_AD_PHONES_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id/files/:type',
      {
        schema: postCategoriesAdsFilesSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const options = {
            limits: { files: 1, fileSize: ADS_FILES_MAX_SIZE_IN_BYTES },
          };
          const files = await request.saveRequestFiles(options);

          if (files.length === 0)
            throw new HttpError(
              `Deve haver uma imagem no corpo da requisição`,
              HttpStatusCodes['Bad Request']
            );

          const file = files[0];

          const categoryAdFile = await this.createCategoryAdFileUseCase.execute(
            {
              categoryAdId: params['id'] as number,
              fileType: file.mimetype,
              type: params['type'] as string,
              temporaryPath: file.filepath,
            },
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return { id: categoryAdFile.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_FILES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/files/:id',
      {
        schema: postCategoriesAdsFilesUpdateSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<IUpdateCategoryAdFileDTO, 'id'>;

          const categoryAdFile = await this.updateCategoryAdFileUseCase.execute(
            { ...data, id: params['id'] as number },
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdFile;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_FILES_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/categories/ads/files/:id',
      {
        schema: deleteCategoryAdFileSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const categoryAdFile = await this.deleteCategoryAdFileUseCase.execute(
            params['id'] as number,
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return categoryAdFile;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CATEGORIES_ADS_FILES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/:id/actions',
      { schema: postCategoriesAdsActionsSchema },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;
          const data = request.body as Omit<
            ICreateCategoryAdActionDTO,
            'categoryAdId'
          >;

          const categoryAdAction =
            await this.createCategoryAdActionUseCase.execute({
              categoryAdId: params['id'] as number,
              description: data.description,
              type: data.type,
              userId: data.userId,
              uuid: data.uuid,
            });

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: categoryAdAction.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_ACTIONS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/categories/ads/:id/actions',
      {
        schema: getCategoriesAdsActionsSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const data = request.query as IConsultCategoryAdActionsDTO;
          const params = request.params as Record<string, unknown>;

          const actions = await this.consultCategoryAdActionsUseCase.execute(
            data,
            params['id'] as number,
            request.customer,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { actions };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CATEGORIES_ADS_ACTIONS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/categories/ads/actions',
      {
        schema: postCategoriesAdsActionsUpdateSchema,
        onRequest: fast.tokenAuth,
      },
      async (request, reply) => {
        try {
          const data = request.body as IUpdateCategoriesAdsActionsDTO;

          const actions = await this.updateCategoriesAdsActionsUseCase.execute(
            data,
            request.user
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { actions };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CATEGORIES_ADS_ACTIONS_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/categories/ads',
      { schema: getFindCategoriesAdsSchema },
      async (request, reply) => {
        try {
          const data = request.query as IFindCategoriesAdsFilterDTO;

          const ads = await this.findCategoriesAdsUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return ads;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CATEGORIES_ADS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
