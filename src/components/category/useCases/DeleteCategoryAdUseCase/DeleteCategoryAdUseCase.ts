import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class DeleteCategoryAdUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<CategoryAd> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem remover anúncios das categorias`,
        HttpStatusCodes.Unauthorized
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      id
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria já está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.deleteCategoryAd(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
