import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../User';
import { IListUsersFilterDTO } from './IListUsersDTO';

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = (
    data: IListUsersFilterDTO,
    admin: IDecodedAdmin | null
  ): Promise<User[]> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem listar os usuários',
        HttpStatusCodes['Unauthorized']
      );

    return this.usersRepository.listUsers(data);
  };
}
