import { ICoordinates, STPoint } from '../../Address';

export interface ICreateAddressRequestDTO {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  coordinates: ICoordinates;
}

export interface ICreateAddressDTO {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  coordinates: STPoint;
}
