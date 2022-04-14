import { FastifyRequest, FastifyReply } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { CODES } from '../../../../constants/Codes';
import { ITokenProvider } from '../../../../providers/ITokenProvider';

export class TokenAuthUseCase {
  constructor(private tokenProvider: ITokenProvider) {}

  execute = async (
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    reply: FastifyReply<
      Server,
      IncomingMessage,
      ServerResponse,
      RouteGenericInterface,
      unknown
    >
  ): Promise<void> => {
    try {
      const TOKEN_POSITION = 1;
      const TOKEN_SPLIT = 'Bearer ';

      const token =
        request.headers['authorization']?.split(TOKEN_SPLIT)[TOKEN_POSITION];

      if (!token) throw new Error('Token not provided');

      const decoded = await this.tokenProvider.decodeToken(token);

      request.admin = decoded.admin;
      request.user = decoded.user;
      request.customer = decoded.customer;

      return;
    } catch (error) {
      console.error(
        `TOKEN_AUTH: ${
          error instanceof Error ? error.message : 'erro desconhecido'
        }.`
      );
      reply.code(CODES.UNAUTHORIZED_CODE).type('application/json').send({
        message: 'Não autorizado.',
      });
    }
  };
}
