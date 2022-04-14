import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Administrator } from '../../Administrator';
import { IAdministratorsRepository } from '../../repositories/IAdministratorsRepository';
import { IListAdministratorFilterDTO } from './IListAdministratorDTO';

export class ListAdministratorsUseCase {
  constructor(private administratorsRepository: IAdministratorsRepository) {}

  execute = (
    data: IListAdministratorFilterDTO,
    admin: IDecodedAdmin | null
  ): Promise<Administrator[]> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem listar os administradores',
        HttpStatusCodes.Unauthorized
      );

    return this.administratorsRepository.listAdmins(data);
  };
}
