import { CODES } from '../constants/Codes';

export enum HttpStatusCodes {
  'Bad Request' = CODES.BAD_REQUEST_CODE,
  'Not Found' = CODES.NOT_FOUND_CODE,
  'Unauthorized' = CODES.UNAUTHORIZED_CODE,
  'Internal Server Error' = CODES.INTERNAL_SERVER_ERROR,
  'Unsupported Media Type' = CODES.UNSUPPORTED_MEDIA_TYPE,
}

export class HttpError extends Error {
  public readonly statusCode: HttpStatusCodes;

  constructor(message: string, statusCode: HttpStatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}
