import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IPhoneProvider } from '../../../../providers/IPhoneProvider';
import { ITokenProvider } from '../../../../providers/ITokenProvider';
import { IUsersRepository } from '../../../user/repositories/IUsersRepository';
import { IDecodedUser, ITokenPayload } from '../TokenAuthUseCase/ITokenAuthDTO';
import { IUserLoginDTO, IUserLoginResponse } from './IUserLoginDTO';

export class UserLoginUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
    private phoneProvider: IPhoneProvider
  ) {}

  execute = async (data: IUserLoginDTO): Promise<IUserLoginResponse> => {
    const phone = this.phoneProvider.parsePhone(data.phone.trim());

    if (!phone)
      throw new HttpError(
        `Telefone inválido: ${data.phone}`,
        HttpStatusCodes['Bad Request']
      );

    const [userFound] = await this.usersRepository.listUsers({
      lastIndex: 0,
      phone,
    });

    if (!userFound)
      throw new HttpError(
        `Usuário não encontrado pelo telefone: ${data.phone}`,
        HttpStatusCodes['Not Found']
      );

    const decodedUser: IDecodedUser = {
      id: userFound.id,
      name: userFound.name,
      phone: userFound.phone,
    };

    const tokenPayload: ITokenPayload = {
      admin: null,
      user: decodedUser,
      customer: null,
    };

    const token = await this.tokenProvider.signToken({ ...tokenPayload });

    return { token, context: decodedUser };
  };
}
