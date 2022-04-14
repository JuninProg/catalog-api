import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError } from '../../errors/HttpError';
import { postContactsSchema } from './Schemas';
import { CreateContactUseCase } from './useCases/CreateContactUseCase/CreateContactUseCase';
import { ICreateContactDTO } from './useCases/CreateContactUseCase/ICreateContactDTO';
import { ListContactsUseCase } from './useCases/ListContactsUseCase/ListContactsUseCase';

export class ContactController {
  constructor(
    private createContactUseCase: CreateContactUseCase,
    private listContactsUseCase: ListContactsUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/contacts',
      { schema: postContactsSchema },
      async (request, reply) => {
        try {
          const data = request.body as ICreateContactDTO;

          const contact = await this.createContactUseCase.execute(data);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { id: contact.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_CONTACTS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/contacts',
      { onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const contacts = await this.listContactsUseCase.execute(
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { contacts };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_CONTACTS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
