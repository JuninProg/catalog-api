import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IListCustomersFilterDTO } from './IListCustomersDTO';

export class ListCustomersUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  execute = (
    data: IListCustomersFilterDTO,
    admin: IDecodedAdmin | null
  ): Promise<Customer[]> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem listar os clientes',
        HttpStatusCodes.Unauthorized
      );

    return this.customersRepository.listCustomers(data);
  };
}
