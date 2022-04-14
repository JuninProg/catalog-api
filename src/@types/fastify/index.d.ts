import * as fastify from 'fastify';
import * as http from 'http';
import {
  IDecodedAdmin,
  IDecodedCustomer,
  IDecodedUser,
} from '../../components/auth/useCases/TokenAuthUseCase/ITokenAuthDTO';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    tokenAuth(): void;
  }
  export interface FastifyRequest {
    admin: IDecodedAdmin | null;
    user: IDecodedUser | null;
    customer: IDecodedCustomer | null;
  }
}
