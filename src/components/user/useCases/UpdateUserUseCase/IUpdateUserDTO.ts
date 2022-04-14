import { ICoordinates, STPoint } from '../../../address/Address';

export interface IUpdateUserRequestDTO {
  id: number;
  name: string;
  phone: string;
  addressZipCode: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressCountry: string | null;
  addressCoordinates: ICoordinates | null;
}

export interface IUpdateUserDTO {
  id: number;
  name: string;
  phone: string;
  addressZipCode: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressCountry: string | null;
  addressCoordinates: STPoint;
}
