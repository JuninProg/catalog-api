import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { GeoJSON } from '../../../address/Address';
import { ICreateUserDTO } from '../../useCases/CreateUserUseCase/ICreateUserDTO';
import { IListUsersFilterDTO } from '../../useCases/ListUsersUseCase/IListUsersDTO';
import { IUpdateUserDTO } from '../../useCases/UpdateUserUseCase/IUpdateUserDTO';
import { User } from '../../User';
import { IUsersRepository } from '../IUsersRepository';
import { buildListUsersQuery } from './Factory';
import { insertUserQuery, updateUserQuery } from './queries/index';

export class PostgresUsersRepository implements IUsersRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveUser = async (data: ICreateUserDTO, createdAt: Date): Promise<User> => {
    const createdUser = await this.database.one(insertUserQuery, {
      ...data,
      createdAt,
    });

    return new User({
      ...createdUser,
      addressCoordinates: new GeoJSON(
        createdUser.addressCoordinates
      ).toSTPoint(),
    });
  };

  listUsers = (data: IListUsersFilterDTO): Promise<User[]> => {
    const { query: selectUsersQuery, values } = buildListUsersQuery(data);
    return this.database.map(
      selectUsersQuery,
      values,
      (row) =>
        new User({
          ...row,
          addressCoordinates: new GeoJSON(row.addressCoordinates).toSTPoint(),
        })
    );
  };

  updateUser = async (data: IUpdateUserDTO, updatedAt: Date): Promise<User> => {
    const updatedUser = await this.database.one(updateUserQuery, {
      ...data,
      updatedAt,
    });

    return new User({
      ...updatedUser,
      addressCoordinates: new GeoJSON(
        updatedUser.addressCoordinates
      ).toSTPoint(),
    });
  };
}
