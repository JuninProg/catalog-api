import { IDecodedUser } from '../TokenAuthUseCase/ITokenAuthDTO';

export interface IUserLoginDTO {
  phone: string;
}

export interface IUserLoginResponse {
  token: string;
  context: IDecodedUser;
}
