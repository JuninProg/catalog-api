import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import {
  deleteAdminSchema,
  getAdminSchema,
  postAdminSchema,
  postAdminUpdatePasswordSchema,
  postAdminUpdateSchema,
  restoreAdminSchema,
} from './Schemas';
import { CreateAdministratorUseCase } from './useCases/CreateAdministratorUseCase/CreateAdministratorUseCase';
import { ICreateAdministratorRequestDTO } from './useCases/CreateAdministratorUseCase/ICreateAdministratorDTO';
import { DeleteAdministratorUseCase } from './useCases/DeleteAdministratorUseCase/DeleteAdministratorUseCase';
import { IListAdministratorFilterDTO } from './useCases/ListAdministratorsUseCase/IListAdministratorDTO';
import { ListAdministratorsUseCase } from './useCases/ListAdministratorsUseCase/ListAdministratorsUseCase';
import { RestoreAdministratorUseCase } from './useCases/RestoreAdministratorUseCase/RestoreAdministratorUseCase';
import { IUpdateAdministratorPasswordDTO } from './useCases/UpdateAdministratorPasswordUseCase/IUpdateAdministratorPasswordDTO';
import { UpdateAdministratorPasswordUseCase } from './useCases/UpdateAdministratorPasswordUseCase/UpdateAdministratorPasswordUseCase';
import { IUpdateAdministratorDTO } from './useCases/UpdateAdministratorUseCase/IUpdateAdministratorDTO';
import { UpdateAdministratorUseCase } from './useCases/UpdateAdministratorUseCase/UpdateAdministratorUseCase';

export class AdministratorController {
  constructor(
    private createAdministratorUseCase: CreateAdministratorUseCase,
    private listAdministratorsUseCase: ListAdministratorsUseCase,
    private updateAdministratorUseCase: UpdateAdministratorUseCase,
    private updateAdministratorPasswordUseCase: UpdateAdministratorPasswordUseCase,
    private deleteAdministratorUseCase: DeleteAdministratorUseCase,
    private restoreAdministratorUseCase: RestoreAdministratorUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/admin',
      { schema: postAdminSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as ICreateAdministratorRequestDTO;

          const administrator = await this.createAdministratorUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: administrator.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADMIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/admin',
      { schema: getAdminSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.query as IListAdministratorFilterDTO;

          const administrators = await this.listAdministratorsUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { administrators };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_ADMIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/admin/:id',
      { schema: postAdminUpdateSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateAdministratorDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const administrator = await this.updateAdministratorUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return administrator;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADMIN_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/admin/:id/password',
      { schema: postAdminUpdatePasswordSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<
            IUpdateAdministratorPasswordDTO,
            'id'
          >;
          const params = request.params as Record<string, unknown>;

          const administrator =
            await this.updateAdministratorPasswordUseCase.execute(
              {
                ...data,
                id: params['id'] as number,
              },
              request.admin
            );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return administrator;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADMIN_UPDATE_PASSWORD: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/admin/:id',
      { schema: deleteAdminSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const administrator = await this.deleteAdministratorUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return administrator;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_ADMIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/admin/:id/restore',
      { schema: restoreAdminSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const administrator = await this.restoreAdministratorUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return administrator;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADMIN_RESTORE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
