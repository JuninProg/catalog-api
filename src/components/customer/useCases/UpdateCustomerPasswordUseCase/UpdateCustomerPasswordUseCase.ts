import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IHashProvider } from '../../../../providers/IHashProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IUpdateCustomerPasswordDTO } from './IUpdateCustomerPasswordDTO';

export class UpdateCustomerPasswordUseCase {
  constructor(
    private customersRepository: ICustomersRepository,
    private dateManagerProvider: IDateManagerProvider,
    private hashProvider: IHashProvider
  ) {}

  execute = async (
    data: IUpdateCustomerPasswordDTO,
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
        `Cliente só pode atualizar a sua senha`,
        HttpStatusCodes.Unauthorized
      );

    if (data.password !== data.confirmPassword)
      throw new HttpError(
        `A senha e a confirmação da senha não estão iguais`,
        HttpStatusCodes['Bad Request']
      );

    const [costumerFound] = await this.customersRepository.listCustomers({
      lastIndex: 0,
      id: data.id,
    });

    if (!costumerFound)
      throw new HttpError(
        `Cliente não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (costumerFound.deletedAt)
      throw new HttpError(
        `Cliente está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const password = await this.hashProvider.genHash(data.password);

    return this.customersRepository.updateCustomerPassword(
      {
        id: data.id,
        password,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
