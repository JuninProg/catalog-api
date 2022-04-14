import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IUpdateCategoryAdDTO } from './IUpdateCategoryAdDTO';

export class UpdateCategoryAdUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCategoryAdDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAd> => {
    if (!admin && !customer)
      throw new HttpError(
        `Você não tem permissão para editar o anúncio da categoria`,
        HttpStatusCodes.Unauthorized
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      data.id
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        `Você não tem permissão para editar o anúncio da categoria`,
        HttpStatusCodes.Unauthorized
      );

    return this.categoriesRepository.updateCategoryAd(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
