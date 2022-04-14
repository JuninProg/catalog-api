import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IHashProvider } from '../../../../providers/IHashProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';
import { IUpdateAdministratorPasswordDTO } from './IUpdateAdministratorPasswordDTO';

export class UpdateAdministratorPasswordUseCase {
  constructor(
    private administratorsRepository: IAdministratorsRepository,
    private dateManagerProvider: IDateManagerProvider,
    private hashProvider: IHashProvider
  ) {}

  execute = async (
    data: IUpdateAdministratorPasswordDTO,
    admin: IDecodedAdmin | null
  ): Promise<Administrator> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    if (data.password !== data.confirmPassword)
      throw new HttpError(
        `A senha e a confirmação da senha não estão iguais`,
        HttpStatusCodes['Bad Request']
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

    if (data.id !== admin.id && !admin.isMaster)
      throw new HttpError(
        `Você não tem permissão para modificar esse administrador`,
        HttpStatusCodes.Unauthorized
      );

    const password = await this.hashProvider.genHash(data.password);

    return this.administratorsRepository.updateAdminPassword(
      {
        id: data.id,
        password,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
