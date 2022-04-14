import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class RestoreCategoryAdUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<CategoryAd> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem restaurar anúncios das categorias`,
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

    if (!categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria não está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.restoreCategoryAd(id);
  };
}
