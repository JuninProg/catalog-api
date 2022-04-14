import { FastifyPluginCallback } from 'fastify';
import { CODES } from '../../constants/Codes';
import { HttpError, HttpStatusCodes } from '../../errors/HttpError';
import { deleteIconsSchema } from './Schemas';
import { CreateIconUseCase } from './useCases/CreateIconUseCase/CreateIconUseCase';
import { DeleteIconUseCase } from './useCases/DeleteIconUseCase/DeleteIconUseCase';
import { ListIconsUseCase } from './useCases/ListIconsUseCase/ListIconsUseCase';

export class IconController {
  constructor(
    private createIconUseCase: CreateIconUseCase,
    private listIconsUseCase: ListIconsUseCase,
    private deleteIconUseCase: DeleteIconUseCase
  ) {}

  handle: FastifyPluginCallback = (fast, opts, done) => {
    fast.post(
      '/icons/:name',
      { onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const options = { limits: { files: 1, fileSize: 52428800 } };
          const files = await request.saveRequestFiles(options);

          if (files.length === 0)
            throw new HttpError(
              `Deve haver uma imagem no corpo da requisição`,
              HttpStatusCodes['Bad Request']
            );

          const file = files[0];

          const icon = await this.createIconUseCase.execute(
            {
              fileType: file.mimetype,
              name: params['name'] as string,
              temporaryPath: file.filepath,
            },
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');

          return { id: icon.id };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`POST_ICONS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.get(
      '/icons',
      { onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const icons = await this.listIconsUseCase.execute({}, request.admin);

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return { icons };
        } catch (error) {
          console.error(error);
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`GET_ICONS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    fast.delete(
      '/icons/:id',
      { schema: deleteIconsSchema, onRequest: fast.tokenAuth },
      async (request, reply) => {
        try {
          const params = request.params as Record<string, unknown>;

          const icon = await this.deleteIconUseCase.execute(
            params['id'] as number,
            request.admin
          );

          reply.code(CODES.DEFAULT_SUCCESS_CODE).type('application/json');
          return icon;
        } catch (error) {
          console.error(error);
          const errorMessage =
            error instanceof Error ? error.message : 'Erro inesperado';
          const statusCode =
            error instanceof HttpError
              ? error.statusCode
              : CODES.DEFAULT_ERROR_CODE;
          console.error(`DELETE_ICONS: ${errorMessage}.`);
          reply.code(statusCode).type('application/json');
          return { message: `${errorMessage}.` };
        }
      }
    );

    done();
  };
}
