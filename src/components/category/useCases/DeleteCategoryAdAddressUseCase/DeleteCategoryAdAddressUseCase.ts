import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd, CategoryAdAddress } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class DeleteCategoryAdAddressUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdAddress> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para remover endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdAddressFound =
      await this.categoriesRepository.findCategoryAdAddressById(id);

    if (!categoryAdAddressFound)
      throw new HttpError(
        `Endereço do anúncio da categoria não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    const categoryAdFound = (await this.categoriesRepository.findCategoryAdById(
      categoryAdAddressFound.categoryAdId
    )) as CategoryAd;

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para remover endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdAddressFound.deletedAt)
      throw new HttpError(
        `Endereço do anúncio da categoria já está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.deleteCategoryAdAddress(
      categoryAdAddressFound.id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
