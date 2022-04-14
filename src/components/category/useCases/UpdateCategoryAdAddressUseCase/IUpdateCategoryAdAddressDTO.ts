import { ICoordinates, STPoint } from '../../../address/Address';

export interface IUpdateCategoryAdAddressRequestDTO {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  coordinates: ICoordinates;
  street: string;
  complement: string | null;
  number: string;
  neighborhood: string | null;
}

export interface IUpdateCategoryAdAddressDTO {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  coordinates: STPoint;
  street: string;
  complement: string | null;
  number: string;
  neighborhood: string | null;
}
