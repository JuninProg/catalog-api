import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { ICategoriesRepository } from '../../../category/repositories/ICategoriesRepository';
import { Address } from '../../Address';
import { IAddressRepository } from '../../repositories/IAddressRepository';

export class DeleteAddressUseCase {
  constructor(
    private addressRepository: IAddressRepository,
    private dateManagerProvider: IDateManagerProvider,
    private categoriesRepository: ICategoriesRepository
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Address> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem remover endereços',
        HttpStatusCodes['Unauthorized']
      );

    const [[addressFound], numOfCategoriesUsingAddress] = await Promise.all([
      this.addressRepository.listAddresses({
        lastIndex: 0,
        id,
      }),
      this.categoriesRepository.countCategoriesByAddressId(id),
    ]);

    if (!addressFound)
      throw new HttpError(
        `Endereço não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (addressFound.deletedAt)
      throw new HttpError(
        `Endereço já está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    if (numOfCategoriesUsingAddress > 0)
      throw new HttpError(
        `Endereço está em uso por uma ou mais categorias`,
        HttpStatusCodes['Bad Request']
      );

    return this.addressRepository.deleteAddress(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
