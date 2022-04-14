import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Category } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export class DeleteCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    id: number,
    admin: IDecodedAdmin | null
  ): Promise<Category> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem remover categorias`,
        HttpStatusCodes.Unauthorized
      );

    const categoryFound = await this.categoriesRepository.findCategoryById(id);

    if (!categoryFound)
      throw new HttpError(
        `Categoria não encontrada pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryFound.deletedAt)
      throw new HttpError(
        `Categoria já está removida: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.deleteCategory(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
