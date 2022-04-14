import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Contact } from '../../Contact';
import { ICreateContactDTO } from '../../useCases/CreateContactUseCase/ICreateContactDTO';
import { IContactsRepository } from '../IContactsRepository';
import { buildListContactsQuery } from './Factory';
import { insertContactQuery } from './queries/index';

export class PostgresContactsRepository implements IContactsRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveContact = async (
    data: ICreateContactDTO,
    createdAt: Date
  ): Promise<Contact> => {
    const createdContact = await this.database.one(insertContactQuery, {
      ...data,
      createdAt,
    });

    return new Contact(createdContact);
  };

  listContacts = (): Promise<Contact[]> => {
    const { query: selectContactsQuery, values } = buildListContactsQuery();

    return this.database.map(
      selectContactsQuery,
      values,
      (row) => new Contact(row)
    );
  };
}
