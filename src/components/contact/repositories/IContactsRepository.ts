import { Contact } from '../Contact';
import { ICreateContactDTO } from '../useCases/CreateContactUseCase/ICreateContactDTO';

export interface IContactsRepository {
  saveContact(data: ICreateContactDTO, createdAt: Date): Promise<Contact>;
  listContacts(): Promise<Contact[]>;
}
