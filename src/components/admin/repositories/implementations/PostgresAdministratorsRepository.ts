import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Administrator } from '../../Administrator';
import { ICreateAdministratorDTO } from '../../useCases/CreateAdministratorUseCase/ICreateAdministratorDTO';
import { IListAdministratorFilterDTO } from '../../useCases/ListAdministratorsUseCase/IListAdministratorDTO';
import { IUpdateAdministratorPasswordDTO } from '../../useCases/UpdateAdministratorPasswordUseCase/IUpdateAdministratorPasswordDTO';
import { IUpdateAdministratorDTO } from '../../useCases/UpdateAdministratorUseCase/IUpdateAdministratorDTO';
import { IAdministratorsRepository } from '../IAdministratorsRepository';
import { buildListAdminsQuery } from './Factory';
import {
  insertAdministratorQuery,
  restoreAdministratorQuery,
  softDeleteAdministratorQuery,
  updateAdministratorPasswordQuery,
  updateAdministratorQuery,
} from './queries/index';

export class PostgresAdministratorsRepository
  implements IAdministratorsRepository
{
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveAdmin = async (
    data: ICreateAdministratorDTO,
    createdAt: Date
  ): Promise<Administrator> => {
    const createdAdmin = await this.database.one(insertAdministratorQuery, {
      ...data,
      createdAt,
    });

    return new Administrator(createdAdmin);
  };

  listAdmins = (
    data: IListAdministratorFilterDTO
  ): Promise<Administrator[]> => {
    const { query: selectAdminsQuery, values } = buildListAdminsQuery(data);
    return this.database.map(
      selectAdminsQuery,
      values,
      (row) => new Administrator(row)
    );
  };

  updateAdmin = async (
    data: IUpdateAdministratorDTO,
    updatedAt: Date
  ): Promise<Administrator> => {
    const updatedAdmin = await this.database.one(updateAdministratorQuery, {
      ...data,
      updatedAt,
    });

    return new Administrator(updatedAdmin);
  };

  updateAdminPassword = async (
    data: Pick<IUpdateAdministratorPasswordDTO, 'id' | 'password'>,
    updatedAt: Date
  ): Promise<Administrator> => {
    const updatedAdmin = await this.database.one(
      updateAdministratorPasswordQuery,
      { ...data, updatedAt }
    );

    return new Administrator(updatedAdmin);
  };

  deleteAdmin = async (id: number, deletedAt: Date): Promise<Administrator> => {
    const deletedAdmin = await this.database.one(softDeleteAdministratorQuery, {
      id,
      deletedAt,
    });

    return new Administrator(deletedAdmin);
  };

  restoreAdmin = async (id: number): Promise<Administrator> => {
    const restoredAdmin = await this.database.one(restoreAdministratorQuery, {
      id,
    });

    return new Administrator(restoredAdmin);
  };
}
