import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { STPoint } from '../../../address/Address';
import {
  IDecodedAdmin,
  IDecodedUser,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../User';
import { IUpdateUserRequestDTO } from './IUpdateUserDTO';

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateUserRequestDTO,
    user: IDecodedUser | null,
    admin: IDecodedAdmin | null
  ): Promise<User> => {
    if (!user && !admin)
      throw new HttpError(
        `Você não tem permissão para executar essa ação`,
        HttpStatusCodes.Unauthorized
      );

    const [userFound] = await this.usersRepository.listUsers({
      lastIndex: 0,
      id: data.id,
    });

    if (!userFound)
      throw new HttpError(
        `Usuário não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (user && user.id !== userFound.id)
      throw new HttpError(
        `Você não tem permissão para modificar esse usuário`,
        HttpStatusCodes.Unauthorized
      );

    return this.usersRepository.updateUser(
      {
        id: data.id,
        name: data.name,
        phone: data.phone,
        addressCity: data.addressCity,
        addressCountry: data.addressCity,
        addressState: data.addressState,
        addressZipCode: data.addressZipCode,
        addressCoordinates: new STPoint(data.addressCoordinates),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
