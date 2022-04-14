import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd, CategoryAdPhone } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class DeleteCategoryAdPhoneUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdPhone> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para remover telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdPhoneFound =
      await this.categoriesRepository.findCategoryAdPhoneById(id);

    if (!categoryAdPhoneFound)
      throw new HttpError(
        `Telefone do anúncio da categoria não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    const categoryAdFound = (await this.categoriesRepository.findCategoryAdById(
      categoryAdPhoneFound.categoryAdId
    )) as CategoryAd;

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para remover telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdPhoneFound.deletedAt)
      throw new HttpError(
        `Telefone do anúncio da categoria já está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.deleteCategoryAdPhone(
      categoryAdPhoneFound.id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
