import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IHashProvider } from '../../../../providers/IHashProvider';
import { ITokenProvider } from '../../../../providers/ITokenProvider';
import { ICustomersRepository } from '../../../customer/repositories/ICustomersRepository';
import {
  IDecodedCustomer,
  ITokenPayload,
} from '../TokenAuthUseCase/ITokenAuthDTO';
import { ICustomerLoginDTO, ICustomerLoginResponse } from './ICustomerLoginDTO';

const DEFAULT_CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS = 86400000;
const CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS = process.env
  .CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS
  ? parseInt(process.env.CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS)
  : DEFAULT_CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS;

export class CustomerLoginUseCase {
  constructor(
    private tokenProvider: ITokenProvider,
    private customersRepository: ICustomersRepository,
    private hashProvider: IHashProvider
  ) {}

  execute = async (
    data: ICustomerLoginDTO
  ): Promise<ICustomerLoginResponse> => {
    const [customerFound] = await this.customersRepository.listCustomers({
      email: data.email,
      lastIndex: 0,
    });

    if (
      !customerFound ||
      (customerFound && customerFound.deletedAt) ||
      (customerFound &&
        !(await this.hashProvider.compareHash(
          customerFound.password,
          data.password
        )))
    )
      throw new HttpError(
        'E-mail ou senha inválidos',
        HttpStatusCodes.Unauthorized
      );

    const decodedCustomer: IDecodedCustomer = {
      id: customerFound.id,
      name: customerFound.name,
    };

    const tokenPayload: ITokenPayload = {
      admin: null,
      user: null,
      customer: decodedCustomer,
    };

    const token = await this.tokenProvider.signToken(
      { ...tokenPayload },
      CUSTOMER_TOKEN_EXPIRES_TIME_IN_MS
    );

    return { token, context: decodedCustomer };
  };
}
