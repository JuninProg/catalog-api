import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IPhoneProvider } from '../../../../providers/IPhoneProvider';
import { STPoint } from '../../../address/Address';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../User';
import { ICreateUserRequestDTO } from './ICreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private dateManagerProvider: IDateManagerProvider,
    private phoneProvider: IPhoneProvider
  ) {}

  execute = async (data: ICreateUserRequestDTO): Promise<User> => {
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

    if (userFound)
      throw new HttpError(
        `Já há um usuário com esse telefone: ${phone}`,
        HttpStatusCodes['Bad Request']
      );

    return this.usersRepository.saveUser(
      {
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
