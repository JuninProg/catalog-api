import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IHashProvider } from '../../../../providers/IHashProvider';
import { IPhoneProvider } from '../../../../providers/IPhoneProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Customer } from '../../Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { ICreateCustomerRequestDTO } from './ICreateCustomerDTO';

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: ICustomersRepository,
    private dateManagerProvider: IDateManagerProvider,
    private hashProvider: IHashProvider,
    private phoneProvider: IPhoneProvider
  ) {}

  execute = async (
    data: ICreateCustomerRequestDTO,
    admin: IDecodedAdmin | null
  ): Promise<Customer> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para executar essa rotina`,
        HttpStatusCodes.Unauthorized
      );

    const [customerFound] = await this.customersRepository.listCustomers({
      lastIndex: 0,
      email: data.email,
    });

    if (customerFound)
      throw new HttpError(
        `E-mail em uso por outro cliente: ${data.email}`,
        HttpStatusCodes['Bad Request']
      );

    if (data.password !== data.confirmPassword)
      throw new HttpError(
        `A senha e a confirmação da senha não estão iguais`,
        HttpStatusCodes['Bad Request']
      );

    const password = await this.hashProvider.genHash(data.password);

    if (data.phone) {
      const phone = this.phoneProvider.parsePhone(data.phone.trim());

      if (!phone)
        throw new HttpError(
          `Telefone inválido: ${data.phone}`,
          HttpStatusCodes['Bad Request']
        );

      data.phone = phone;
    }

    return this.customersRepository.saveCustomer(
      {
        email: data.email,
        name: data.name,
        password,
        phone: data.phone,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
