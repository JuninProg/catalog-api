import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IHashProvider } from '../../../../providers/IHashProvider';
import { IPhoneProvider } from '../../../../providers/IPhoneProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';
import { ICreateAdministratorRequestDTO } from './ICreateAdministratorDTO';

export class CreateAdministratorUseCase {
  constructor(
    private administratorsRepository: IAdministratorsRepository,
    private dateManagerProvider: IDateManagerProvider,
    private hashProvider: IHashProvider,
    private phoneProvider: IPhoneProvider
  ) {}

  execute = async (
    data: ICreateAdministratorRequestDTO,
    admin: IDecodedAdmin | null
  ): Promise<Administrator> => {
    if (!admin || (admin && !admin.isMaster))
      throw new HttpError(
        `Somente administradores "master" podem criar novos administradores`,
        HttpStatusCodes['Unauthorized']
      );

    const [adminFound] = await this.administratorsRepository.listAdmins({
      lastIndex: 0,
      email: data.email,
    });

    if (adminFound)
      throw new HttpError(
        `E-mail em uso por outro administrador: ${data.email}`,
        HttpStatusCodes['Bad Request']
      );

    if (data.password !== data.confirmPassword)
      throw new HttpError(
        `A senha e a confirmação da senha não estão iguais`,
        HttpStatusCodes['Bad Request']
      );

    const password = await this.hashProvider.genHash(data.password);
    const phone = this.phoneProvider.parsePhone(data.phone.trim());

    if (!phone)
      throw new HttpError(
        `Telefone inválido: ${data.phone}`,
        HttpStatusCodes['Bad Request']
      );

    return this.administratorsRepository.saveAdmin(
      {
        isMaster: data.isMaster,
        email: data.email,
        name: data.name,
        password,
        phone,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
