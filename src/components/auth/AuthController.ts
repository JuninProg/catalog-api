import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import {
  postAdminLoginSchema,
  postCustomerLoginSchema,
  postUserLoginSchema,
} from './Schemas';
import { AdminLoginUseCase } from './useCases/AdminLoginUseCase/AdminLoginUseCase';
import { IAdminLoginDTO } from './useCases/AdminLoginUseCase/IAdminLoginDTO';
import { CustomerLoginUseCase } from './useCases/CustomerLoginUseCase/CustomerLoginUseCase';
import { ICustomerLoginDTO } from './useCases/CustomerLoginUseCase/ICustomerLoginDTO';
import { TokenAuthUseCase } from './useCases/TokenAuthUseCase/TokenAuthUseCase';
import { IUserLoginDTO } from './useCases/UserLoginUseCase/IUserLoginDTO';
import { UserLoginUseCase } from './useCases/UserLoginUseCase/UserLoginUseCase';

export class AuthController {
  constructor(
    private tokenAuthUseCase: TokenAuthUseCase,
    private adminLoginUseCase: AdminLoginUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private customerLoginUseCase: CustomerLoginUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/admin/login',
      { schema: postAdminLoginSchema },
      async (request, reply) => {
        try {
          const data = request.body as IAdminLoginDTO;

          const adminLogin = await this.adminLoginUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return adminLogin;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADMIN_LOGIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/users/login',
      { schema: postUserLoginSchema },
      async (request, reply) => {
        try {
          const data = request.body as IUserLoginDTO;

          const userLogin = await this.userLoginUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return userLogin;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_USERS_LOGIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/customers/login',
      { schema: postCustomerLoginSchema },
      async (request, reply) => {
        try {
          const data = request.body as ICustomerLoginDTO;

          const customerLogin = await this.customerLoginUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return customerLogin;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CUSTOMERS_LOGIN: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.decorate('tokenAuth', this.tokenAuthUseCase.execute);
    fast.decorateRequest('admin', null);
    fast.decorateRequest('user', null);
    fast.decorateRequest('customer', null);

    done();
  };
}
