import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export class RestoreCustomerUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Customer> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    const [customerFound] = await this.customersRepository.listCustomers({
      lastIndex: 0,
      id,
    });

    if (!customerFound)
      throw new HttpError(
        `Customer não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (!customerFound.deletedAt)
      throw new HttpError(
        `Customer não está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.customersRepository.restoreCustomer(id);
  };
}
