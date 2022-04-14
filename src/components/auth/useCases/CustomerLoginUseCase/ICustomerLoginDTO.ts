import { IDecodedCustomer } from '../TokenAuthUseCase/ITokenAuthDTO';

export interface ICustomerLoginDTO {
  email: string;
  password: string;
}

export interface ICustomerLoginResponse {
  token: string;
  context: IDecodedCustomer;
}
