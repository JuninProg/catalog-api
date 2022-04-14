import { IDecodedAdmin } from '../TokenAuthUseCase/ITokenAuthDTO';

export interface IAdminLoginDTO {
  email: string;
  password: string;
}

export interface IAdminLoginResponse {
  token: string;
  context: IDecodedAdmin;
}
