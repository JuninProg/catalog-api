import { Address } from '../../Address';
import { IAddressRepository } from '../../repositories/IAddressRepository';
import { IListAddressesFilterDTO } from './IListAddressDTO';

export class ListAddressesUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  execute = (data: IListAddressesFilterDTO): Promise<Address[]> =>
    this.addressRepository.listAddresses(data);
}
