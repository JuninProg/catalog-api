import { Address } from '../Address';
import { ICreateAddressDTO } from '../useCases/CreateAddressUseCase/ICreateAddressDTO';
import { IListAddressesFilterDTO } from '../useCases/ListAddressesUseCase/IListAddressDTO';
import { IUpdateAddressDTO } from '../useCases/UpdateAddressUseCase/IUpdateAddressDTO';

export interface IAddressRepository {
  saveAddress(data: ICreateAddressDTO, createdAt: Date): Promise<Address>;
  listAddresses(data: IListAddressesFilterDTO): Promise<Address[]>;
  updateAddress(data: IUpdateAddressDTO, updatedAt: Date): Promise<Address>;
  deleteAddress(id: number, deletedAt: Date): Promise<Address>;
  restoreAddress(id: number): Promise<Address>;
}
