import { IAddress } from '../components/address/Address';

export interface ISearchAddressProvider {
  findAddressByZipCode(zipCode: string): Promise<IAddress>;
  findAddressByCoordinates(lat: number, long: number): Promise<IAddress>;
}
