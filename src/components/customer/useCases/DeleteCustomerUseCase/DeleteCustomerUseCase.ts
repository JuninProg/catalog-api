import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export class DeleteCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Customer> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
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

    if (customerFound.deletedAt)
      throw new HttpError(
        `Customer está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.customersRepository.deleteCustomer(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
