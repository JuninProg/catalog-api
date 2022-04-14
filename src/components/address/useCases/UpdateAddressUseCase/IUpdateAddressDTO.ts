import { ICoordinates, STPoint } from '../../Address';

export interface IUpdateAddressRequestDTO {
  id: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  coordinates: ICoordinates;
}

export interface IUpdateAddressDTO {
  id: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  coordinates: STPoint;
}
