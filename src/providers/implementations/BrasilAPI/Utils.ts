import axios from 'axios';
import { HttpError, HttpStatusCodes } from '../../../errors/HttpError';
import { IBrasilAPIResponseError } from './Types';

export function BrasilAPIErrorHandle(error: unknown): HttpError {
  if (axios.isAxiosError(error)) {
    const errorResponse = error.response;

    if (!errorResponse)
      throw new HttpError(
        `BrasilAPI não retornou a requisição`,
        HttpStatusCodes['Bad Request']
      );

    const data = errorResponse.data as IBrasilAPIResponseError;

    throw new HttpError(data.errors[0].message, errorResponse.status);
  } else {
    throw new HttpError(
      error instanceof Error ? error.message : 'Algo deu errado',
      HttpStatusCodes['Internal Server Error']
    );
  }
}
