import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Icon } from '../../Icon';
import { ICreateIconDTO } from '../../useCases/CreateIconUseCase/ICreateIconDTO';
import { IListIconsFilterDTO } from '../../useCases/ListIconsUseCase/IListIconDTO';
import { IIconsRepository } from '../IIconsRepository';
import { buildListIconsQuery } from './Factory';
import { insertIconQuery, sofDeleteIconQuery } from './queries/index';

export class PostgresIconsRepository implements IIconsRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveIcon = async (data: ICreateIconDTO, createdAt: Date): Promise<Icon> => {
    const createdIcon = await this.database.one(insertIconQuery, {
      ...data,
      createdAt,
    });

    return new Icon(createdIcon);
  };

  listIcons = (data: IListIconsFilterDTO) => {
    const { query: selectIconsQuery, values } = buildListIconsQuery(data);
    return this.database.map(selectIconsQuery, values, (row) => new Icon(row));
  };

  deleteIcon = async (id: number, deletedAt: Date): Promise<Icon> => {
    const deletedIcon = await this.database.one(sofDeleteIconQuery, {
      id,
      deletedAt,
    });

    return new Icon(deletedIcon);
  };
}
