import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IHashProvider } from '../../../../providers/IHashProvider';
import { ITokenProvider } from '../../../../providers/ITokenProvider';
import { IAdministratorsRepository } from '../../../admin/repositories/IAdministratorsRepository';
import {
  IDecodedAdmin,
  ITokenPayload,
} from '../TokenAuthUseCase/ITokenAuthDTO';
import { IAdminLoginDTO, IAdminLoginResponse } from './IAdminLoginDTO';

const DEFAULT_ADMIN_TOKEN_EXPIRES_TIME_IN_MS = 86400000;
const ADMIN_TOKEN_EXPIRES_TIME_IN_MS = process.env
  .ADMIN_TOKEN_EXPIRES_TIME_IN_MS
  ? parseInt(process.env.ADMIN_TOKEN_EXPIRES_TIME_IN_MS)
  : DEFAULT_ADMIN_TOKEN_EXPIRES_TIME_IN_MS;

export class AdminLoginUseCase {
  constructor(
    private tokenProvider: ITokenProvider,
    private administratorsRepository: IAdministratorsRepository,
    private hashProvider: IHashProvider
  ) {}

  execute = async (data: IAdminLoginDTO): Promise<IAdminLoginResponse> => {
    const [administratorFound] = await this.administratorsRepository.listAdmins(
      {
        email: data.email,
        lastIndex: 0,
      }
    );

    if (
      !administratorFound ||
      (administratorFound && administratorFound.deletedAt) ||
      (administratorFound &&
        !(await this.hashProvider.compareHash(
          administratorFound.password,
          data.password
        )))
    )
      throw new HttpError(
        'E-mail ou senha inválidos',
        HttpStatusCodes.Unauthorized
      );

    const decodedAdmin: IDecodedAdmin = {
      id: administratorFound.id,
      name: administratorFound.name,
      isMaster: administratorFound.isMaster,
    };

    const tokenPayload: ITokenPayload = {
      admin: decodedAdmin,
      user: null,
      customer: null,
    };

    const token = await this.tokenProvider.signToken(
      { ...tokenPayload },
      ADMIN_TOKEN_EXPIRES_TIME_IN_MS
    );

    return { token, context: decodedAdmin };
  };
}
