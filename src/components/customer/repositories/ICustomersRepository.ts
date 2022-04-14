import { Customer } from '../Customer';
import { ICreateCustomerDTO } from '../useCases/CreateCustomerUseCase/ICreateCustomerDTO';
import { IListCustomersFilterDTO } from '../useCases/ListCustomersUseCase/IListCustomersDTO';
import { IUpdateCustomerPasswordDTO } from '../useCases/UpdateCustomerPasswordUseCase/IUpdateCustomerPasswordDTO';
import { IUpdateCustomerDTO } from '../useCases/UpdateCustomerUseCase/IUpdateCustomerDTO';

export interface ICustomersRepository {
  saveCustomer(data: ICreateCustomerDTO, createdAt: Date): Promise<Customer>;
  listCustomers(data: IListCustomersFilterDTO): Promise<Customer[]>;
  updateCustomer(data: IUpdateCustomerDTO, updatedAt: Date): Promise<Customer>;
  updateCustomerPassword(
    data: Pick<IUpdateCustomerPasswordDTO, 'id' | 'password'>,
    updatedAt: Date
  ): Promise<Customer>;
  deleteCustomer(id: number, deletedAt: Date): Promise<Customer>;
  restoreCustomer(id: number): Promise<Customer>;
}
