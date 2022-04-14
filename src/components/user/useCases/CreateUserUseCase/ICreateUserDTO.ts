import { ICoordinates, STPoint } from '../../../address/Address';

export interface ICreateUserRequestDTO {
  name: string;
  phone: string;
  addressZipCode: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressCountry: string | null;
  addressCoordinates: ICoordinates | null;
}

export interface ICreateUserDTO {
  name: string;
  phone: string;
  addressZipCode: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressCountry: string | null;
  addressCoordinates: STPoint;
}
