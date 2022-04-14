import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { IIconsRepository } from '../../../icon/repositories/IIconsRepository';
import { Category } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IUpdateCategoryDTO } from './IUpdateCategoryDTO';

export class UpdateCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider,
    private iconsRepository: IIconsRepository
  ) {}

  execute = async (
    data: IUpdateCategoryDTO,
    admin: IDecodedAdmin | null
  ): Promise<Category> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem atualizar categorias`,
        HttpStatusCodes.Unauthorized
      );

    const [categoryFound, [iconFound]] = await Promise.all([
      this.categoriesRepository.findCategoryById(data.id),
      this.iconsRepository.listIcons({
        id: data.iconId,
      }),
    ]);

    if (!categoryFound)
      throw new HttpError(
        `Categoria não encontrada pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryFound.deletedAt)
      throw new HttpError(
        `Categoria está removida: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    if (!iconFound)
      throw new HttpError(
        `Ícone não encontrado pelo id: ${data.iconId}`,
        HttpStatusCodes['Not Found']
      );

    if (iconFound.deletedAt)
      throw new HttpError(
        `Ícone está removido: ${data.iconId}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.updateCategory(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
