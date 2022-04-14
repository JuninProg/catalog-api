import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { Contact } from '../../Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';
import { ICreateContactDTO } from './ICreateContactDTO';

export class CreateContactUseCase {
  constructor(
    private contactsRepository: IContactsRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = (data: ICreateContactDTO): Promise<Contact> =>
    this.contactsRepository.saveContact(
      data,
      this.dateManagerProvider.getNewDate()
    );
}
