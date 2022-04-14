import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';

export class DeleteAdministratorUseCase {
  constructor(
    private administratorsRepository: IAdministratorsRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Administrator> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    if (id !== admin.id && !admin.isMaster)
      throw new HttpError(
        `Você não tem permissão para remover esse administrador`,
        HttpStatusCodes.Unauthorized
      );

    const [adminFound] = await this.administratorsRepository.listAdmins({
      lastIndex: 0,
      id,
    });

    if (!adminFound)
      throw new HttpError(
        `Administrador não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (adminFound.deletedAt)
      throw new HttpError(
        `Administrador está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.administratorsRepository.deleteAdmin(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
