import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Customer } from '../../Customer';
import { ICreateCustomerDTO } from '../../useCases/CreateCustomerUseCase/ICreateCustomerDTO';
import { IListCustomersFilterDTO } from '../../useCases/ListCustomersUseCase/IListCustomersDTO';
import { IUpdateCustomerPasswordDTO } from '../../useCases/UpdateCustomerPasswordUseCase/IUpdateCustomerPasswordDTO';
import { IUpdateCustomerDTO } from '../../useCases/UpdateCustomerUseCase/IUpdateCustomerDTO';
import { ICustomersRepository } from '../ICustomersRepository';
import { buildListCustomersQuery } from './Factory';
import {
  insertCustomerQuery,
  restoreCustomerQuery,
  softDeleteCustomerQuery,
  updateCustomerPasswordQuery,
  updateCustomerQuery,
} from './queries/index';

export class PostgresCustomersRepository implements ICustomersRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveCustomer = async (
    data: ICreateCustomerDTO,
    createdAt: Date
  ): Promise<Customer> => {
    const createdCustomer = await this.database.one(insertCustomerQuery, {
      ...data,
      createdAt,
    });

    return new Customer(createdCustomer);
  };

  listCustomers = (data: IListCustomersFilterDTO): Promise<Customer[]> => {
    const { query: selectCustomersQuery, values } =
      buildListCustomersQuery(data);
    return this.database.map(
      selectCustomersQuery,
      values,
      (row) => new Customer(row)
    );
  };

  updateCustomer = async (
    data: IUpdateCustomerDTO,
    updatedAt: Date
  ): Promise<Customer> => {
    const updatedCustomer = await this.database.one(updateCustomerQuery, {
      ...data,
      updatedAt,
    });

    return new Customer(updatedCustomer);
  };

  updateCustomerPassword = async (
    data: Pick<IUpdateCustomerPasswordDTO, 'id' | 'password'>,
    updatedAt: Date
  ): Promise<Customer> => {
    const updatedCustomer = await this.database.one(
      updateCustomerPasswordQuery,
      { ...data, updatedAt }
    );

    return new Customer(updatedCustomer);
  };

  deleteCustomer = async (id: number, deletedAt: Date): Promise<Customer> => {
    const deletedCustomer = await this.database.one(softDeleteCustomerQuery, {
      id,
      deletedAt,
    });

    return new Customer(deletedCustomer);
  };

  restoreCustomer = async (id: number): Promise<Customer> => {
    const restoredCustomer = await this.database.one(restoreCustomerQuery, {
      id,
    });

    return new Customer(restoredCustomer);
  };
}
