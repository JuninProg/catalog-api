import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';

export class RestoreAdministratorUseCase {
  constructor(private administratorsRepository: IAdministratorsRepository) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Administrator> => {
    if (!admin || (admin && !admin.isMaster))
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
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

    if (!adminFound.deletedAt)
      throw new HttpError(
        `Administrador não está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.administratorsRepository.restoreAdmin(id);
  };
}
