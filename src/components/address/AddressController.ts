import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import {
  deleteAddressSchema,
  getAddressCoordinatesSchema,
  getAddressSchema,
  getAddressZipCodeSchema,
  postAddressSchema,
  postAddressUpdateSchema,
  restoreAddressSchema,
} from './Schemas';
import { ConsultAddressUseCase } from './useCases/ConsultAddressUseCase/ConsultAddressUseCase';
import { CreateAddressUseCase } from './useCases/CreateAddressUseCase/CreateAddressUseCase';
import { ICreateAddressRequestDTO } from './useCases/CreateAddressUseCase/ICreateAddressDTO';
import { DeleteAddressUseCase } from './useCases/DeleteAddressUseCase/DeleteAddressUseCase';
import { IListAddressesFilterDTO } from './useCases/ListAddressesUseCase/IListAddressDTO';
import { ListAddressesUseCase } from './useCases/ListAddressesUseCase/ListAddressesUseCase';
import { RestoreAddressUseCase } from './useCases/RestoreAddressUseCase/RestoreAddressUseCase';
import { IUpdateAddressRequestDTO } from './useCases/UpdateAddressUseCase/IUpdateAddressDTO';
import { UpdateAddressUseCase } from './useCases/UpdateAddressUseCase/UpdateAddressUseCase';

export class AddressController {
  constructor(
    private consultAddressUseCase: ConsultAddressUseCase,
    private createAddressUseCase: CreateAddressUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
    private listAddressesUseCase: ListAddressesUseCase,
    private deleteAddressUseCase: DeleteAddressUseCase,
    private restoreAddressUseCase: RestoreAddressUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.get(
      '/address/zipcode',
      { schema: getAddressZipCodeSchema },
      async (request, reply) => {
        try {
          const query = request.query as Record<string, unknown>;

          const address = await this.consultAddressUseCase.execute({
            zipCode: query['zipCode'] as string,
          });

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return address;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_ADDRESS_ZIP_CODE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/address/coordinates',
      { schema: getAddressCoordinatesSchema },
      async (request, reply) => {
        try {
          const query = request.query as Record<string, unknown>;

          const address = await this.consultAddressUseCase.execute({
            lat: query['lat'] as number,
            long: query['long'] as number,
          });

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return address;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_ADDRESS_COORDINATES: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/address',
      { schema: getAddressSchema },
      async (request, reply) => {
        try {
          const data = request.query as IListAddressesFilterDTO;

          const addresses = await this.listAddressesUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return { addresses };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_ADDRESS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/address',
      { schema: postAddressSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as ICreateAddressRequestDTO;

          const address = await this.createAddressUseCase.execute(
            data,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return { id: address.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADDRESS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/address/:id',
      { schema: postAddressUpdateSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const data = request.body as Omit<IUpdateAddressRequestDTO, 'id'>;
          const params = request.params as Record<string, unknown>;

          const address = await this.updateAddressUseCase.execute(
            {
              ...data,
              id: params['id'] as number,
            },
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return address;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADDRESS_UPDATE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/address/:id',
      { schema: deleteAddressSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const address = await this.deleteAddressUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return address;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_ADDRESS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.post(
      '/address/:id/restore',
      { schema: restoreAddressSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const address = await this.restoreAddressUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return address;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ADDRESS_RESTORE: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
