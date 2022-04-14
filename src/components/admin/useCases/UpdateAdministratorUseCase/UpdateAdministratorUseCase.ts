import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IPhoneProvider } from '../../../../providers/IPhoneProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';
import { IUpdateAdministratorDTO } from './IUpdateAdministratorDTO';

export class UpdateAdministratorUseCase {
  constructor(
    private administratorsRepository: IAdministratorsRepository,
    private dateManagerProvider: IDateManagerProvider,
    private phoneProvider: IPhoneProvider
  ) {}

  execute = async (
    data: IUpdateAdministratorDTO,
    admin: IDecodedAdmin | null
  ): Promise<Administrator> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    const [adminFound] = await this.administratorsRepository.listAdmins({
      lastIndex: 0,
      id: data.id,
    });

    if (!adminFound)
      throw new HttpError(
        `Administrador não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (adminFound.deletedAt)
      throw new HttpError(
        `Administrador está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    if (data.isMaster !== adminFound.isMaster && !admin.isMaster)
      throw new HttpError(
        `Somente administradores "master" podem tornar outros administradores "master"`,
        HttpStatusCodes.Unauthorized
      );

    if (data.id !== admin.id && !admin.isMaster)
      throw new HttpError(
        `Você não tem permissão para modificar esse administrador`,
        HttpStatusCodes.Unauthorized
      );

    const [sameEmailAdmin] = await this.administratorsRepository.listAdmins({
      lastIndex: 0,
      email: data.email,
    });

    if (sameEmailAdmin && sameEmailAdmin.id !== adminFound.id)
      throw new HttpError(
        `E-mail em uso por outro administrador: ${data.email}`,
        HttpStatusCodes['Bad Request']
      );

    const phone = this.phoneProvider.parsePhone(data.phone.trim());

    if (!phone)
      throw new HttpError(
        `Telefone inválido: ${data.phone}`,
        HttpStatusCodes['Bad Request']
      );

    return this.administratorsRepository.updateAdmin(
      {
        isMaster: data.isMaster,
        email: data.email,
        name: data.name,
        phone,
        id: data.id,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
