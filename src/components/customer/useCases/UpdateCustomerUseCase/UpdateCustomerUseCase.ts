import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IUpdateCustomerDTO } from './IUpdateCustomerDTO';

export class UpdateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCustomerDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<Customer> => {
    if (!admin && !customer)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    if (customer && customer.id !== data.id)
      throw new HttpError(
        `Cliente só pode se atualizar`,
        HttpStatusCodes['Unauthorized']
      );

    const [customerFound] = await this.customersRepository.listCustomers({
      lastIndex: 0,
      id: data.id,
    });

    if (!customerFound)
      throw new HttpError(
        `Cliente não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (customerFound.deletedAt)
      throw new HttpError(
        `Cliente está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const [sameEmailCustomer] = await this.customersRepository.listCustomers({
      lastIndex: 0,
      email: data.email,
    });

    if (sameEmailCustomer && sameEmailCustomer.id !== customerFound.id)
      throw new HttpError(
        `E-mail em uso por outro cliente: ${data.email}`,
        HttpStatusCodes['Bad Request']
      );

    return this.customersRepository.updateCustomer(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
