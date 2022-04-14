import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import {
  getUsersSchema,
  postUsersSchema,
  postUsersUpdateSchema,
} from './Schemas';
import { CreateUserUseCase } from './useCases/CreateUserUseCase/CreateUserUseCase';
import { ICreateUserRequestDTO } from './useCases/CreateUserUseCase/ICreateUserDTO';
import { IListUsersFilterDTO } from './useCases/ListUsersUseCase/IListUsersDTO';
import { ListUsersUseCase } from './useCases/ListUsersUseCase/ListUsersUseCase';
import { IUpdateUserRequestDTO } from './useCases/UpdateUserUseCase/IUpdateUserDTO';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase/UpdateUserUseCase';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post('/users', { schema: postUsersSchema }, async (request, reply) => {
      try {
        const data = request.body as ICreateUserRequestDTO;

        const user = await this.createUserUseCase.execute(data);

        reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
        return { id: user.id };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro inesperado';
        const statusCode =
          error instanceof HttpError
            ? error.statusCode
            : CODES.DEFAULT_ERROR_CODE;
        console.error(`POST_USERS: ${errorMessage}.`);
        reply.code(statusCode).type('application/json');
        return { message: `${errorMessage}.` };
      }
    });

    fast.get(
      '/users',
      { onRequest: fast.tokenAuth, schema: getUsersSchema },
      async (request, reply) => {
        try {
          const data = request.query as IListUsersFilterDTO;

          const users = await this.listUsersUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { users };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_USERS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/users/:id',
      { onRequest: fast.tokenAuth, schema: postUsersUpdateSchema },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateUserRequestDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const user = await this.updateUserUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.user,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return user;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_USERS_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
