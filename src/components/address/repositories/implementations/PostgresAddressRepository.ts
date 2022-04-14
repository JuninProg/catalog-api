import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Address, GeoJSON } from '../../Address';
import { ICreateAddressDTO } from '../../useCases/CreateAddressUseCase/ICreateAddressDTO';
import { IListAddressesFilterDTO } from '../../useCases/ListAddressesUseCase/IListAddressDTO';
import { IUpdateAddressDTO } from '../../useCases/UpdateAddressUseCase/IUpdateAddressDTO';
import { IAddressRepository } from '../IAddressRepository';
import { buildListAddressesQuery } from './Factory';
import {
  insertAddressQuery,
  restoreAddressQuery,
  softDeleteAddressQuery,
  updateAddressQuery,
} from './queries/index';

export class PostgresAddressRepository implements IAddressRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveAddress = async (
    data: ICreateAddressDTO,
    createdAt: Date
  ): Promise<Address> => {
    const createdAddress = await this.database.one(insertAddressQuery, {
      ...data,
      createdAt,
    });

    return new Address({
      ...createdAddress,
      coordinates: new GeoJSON(createdAddress.coordinates).toSTPoint(),
    });
  };

  listAddresses = (data: IListAddressesFilterDTO): Promise<Address[]> => {
    const { query: selectAddressesQuery, values } =
      buildListAddressesQuery(data);

    return this.database.map(
      selectAddressesQuery,
      values,
      (row) =>
        new Address({
          ...row,
          coordinates: new GeoJSON(row.coordinates).toSTPoint(),
        })
    );
  };

  updateAddress = async (
    data: IUpdateAddressDTO,
    updatedAt: Date
  ): Promise<Address> => {
    const updatedAddress = await this.database.one(updateAddressQuery, {
      ...data,
      updatedAt,
    });

    return new Address({
      ...updatedAddress,
      coordinates: new GeoJSON(updatedAddress.coordinates).toSTPoint(),
    });
  };

  deleteAddress = async (id: number, deletedAt: Date): Promise<Address> => {
    const deleteAddress = await this.database.one(softDeleteAddressQuery, {
      id,
      deletedAt,
    });

    return new Address({
      ...deleteAddress,
      coordinates: new GeoJSON(deleteAddress.coordinates).toSTPoint(),
    });
  };

  restoreAddress = async (id: number): Promise<Address> => {
    const restoredAddress = await this.database.one(restoreAddressQuery, {
      id,
    });

    return new Address({
      ...restoredAddress,
      coordinates: new GeoJSON(restoredAddress.coordinates).toSTPoint(),
    });
  };
}
