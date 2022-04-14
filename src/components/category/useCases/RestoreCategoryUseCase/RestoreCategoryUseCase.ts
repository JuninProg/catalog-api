import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Category } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class RestoreCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Category> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem restaurar categorias`,
        HttpStatusCodes.Unauthorized
      );

    const categoryFound = await this.categoriesRepository.findCategoryById(id);

    if (!categoryFound)
      throw new HttpError(
        `Categoria não encontrada pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (!categoryFound.deletedAt)
      throw new HttpError(
        `Categoria não está removida: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.restoreCategory(id);
  };
}
