import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import {
  deleteCustomerSchema,
  getCustomersSchema,
  postCustomerSchema,
  postCustomerUpdatePasswordSchema,
  postCustomerUpdateSchema,
  restoreCustomerSchema,
} from './Schemas';
import { CreateCustomerUseCase } from './useCases/CreateCustomerUseCase/CreateCustomerUseCase';
import { ICreateCustomerRequestDTO } from './useCases/CreateCustomerUseCase/ICreateCustomerDTO';
import { DeleteCustomerUseCase } from './useCases/DeleteCustomerUseCase/DeleteCustomerUseCase';
import { IListCustomersFilterDTO } from './useCases/ListCustomersUseCase/IListCustomersDTO';
import { ListCustomersUseCase } from './useCases/ListCustomersUseCase/ListCustomersUseCase';
import { RestoreCustomerUseCase } from './useCases/RestoreCustomerUseCase/RestoreCustomerUseCase';
import { IUpdateCustomerPasswordDTO } from './useCases/UpdateCustomerPasswordUseCase/IUpdateCustomerPasswordDTO';
import { UpdateCustomerPasswordUseCase } from './useCases/UpdateCustomerPasswordUseCase/UpdateCustomerPasswordUseCase';
import { IUpdateCustomerDTO } from './useCases/UpdateCustomerUseCase/IUpdateCustomerDTO';
import { UpdateCustomerUseCase } from './useCases/UpdateCustomerUseCase/UpdateCustomerUseCase';

export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private listCustomersUseCase: ListCustomersUseCase,
    private updateCustomerUseCase: UpdateCustomerUseCase,
    private updateCustomerPasswordUseCase: UpdateCustomerPasswordUseCase,
    private deleteCustomerUseCase: DeleteCustomerUseCase,
    private restoreCustomerUseCase: RestoreCustomerUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/customers',
      { schema: postCustomerSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as ICreateCustomerRequestDTO;

          const customer = await this.createCustomerUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: customer.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CUSTOMERS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/customers',
      { schema: getCustomersSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.query as IListCustomersFilterDTO;

          const customers = await this.listCustomersUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { customers };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CUSTOMERS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/customers/:id',
      { schema: postCustomerUpdateSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateCustomerDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const customer = await this.updateCustomerUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return customer;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CUSTOMERS_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/customers/:id/password',
      { schema: postCustomerUpdatePasswordSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateCustomerPasswordDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const customer = await this.updateCustomerPasswordUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.admin,
            request.customer
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return customer;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CUSTOMERS_UPDATE_PASSWORD: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/customers/:id',
      { schema: deleteCustomerSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const customer = await this.deleteCustomerUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return customer;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_CUSTOMERS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/customers/:id/restore',
      { schema: restoreCustomerSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const customer = await this.restoreCustomerUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return customer;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CUSTOMER_RESTORE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
