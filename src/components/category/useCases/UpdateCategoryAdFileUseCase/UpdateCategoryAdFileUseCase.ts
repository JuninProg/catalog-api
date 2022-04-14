import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd, CategoryAdFile } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IUpdateCategoryAdFileDTO } from './IUpdateCategoryAdFileDTO';

export class UpdateCategoryAdFileUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCategoryAdFileDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdFile> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para atualizar arquivo do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdFileFound =
      await this.categoriesRepository.findCategoryAdFileById(data.id);

    if (!categoryAdFileFound)
      throw new HttpError(
        `Arquivo do anúncio da categoria não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdFileFound.deletedAt)
      throw new HttpError(
        `Arquivo do anúncio da categoria está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const categoryAdFound = (await this.categoriesRepository.findCategoryAdById(
      categoryAdFileFound.categoryAdId
    )) as CategoryAd;

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para atualizar arquivo do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${categoryAdFileFound.categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.updateCategoryAdFile(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
