import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Contact } from '../../Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

export class ListContactsUseCase {
  constructor(private contactsRepository: IContactsRepository) {}

  execute = (admin: IDecodedAdmin | null): Promise<Contact[]> => {
    if (!admin)
      throw new HttpError(
        `Você não tem permissão para listar os contatos`,
        HttpStatusCodes['Unauthorized']
      );

    return this.contactsRepository.listContacts();
  };
}
