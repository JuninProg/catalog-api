import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Address } from '../../Address';
import { IAddressRepository } from '../../repositories/IAddressRepository';

export class RestoreAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Address> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem restaurar endereços',
        HttpStatusCodes['Unauthorized']
      );

    const [addressFound] = await this.addressRepository.listAddresses({
      lastIndex: 0,
      id,
    });

    if (!addressFound)
      throw new HttpError(
        `Endereço não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (!addressFound.deletedAt)
      throw new HttpError(
        `Endereço não está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.addressRepository.restoreAddress(id);
  };
}
