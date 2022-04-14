import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IFileUploaderProvider } from '../../../../providers/IFileUploaderProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { ICategoriesRepository } from '../../../category/repositories/ICategoriesRepository';
import { Icon } from '../../Icon';
import { IIconsRepository } from '../../repositories/IIconsRepository';

export class DeleteIconUseCase {
  constructor(
    private iconsRepository: IIconsRepository,
    private dateManagerProvider: IDateManagerProvider,
    private fileUploaderProvider: IFileUploaderProvider,
    private categoriesRepository: ICategoriesRepository
  ) {}

  execute = async (id: number, admin: IDecodedAdmin | null): Promise<Icon> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem remover ícones`,
        HttpStatusCodes.Unauthorized
      );

    const [[iconFound], numOfCategoriesUsingIcon] = await Promise.all([
      this.iconsRepository.listIcons({
        id,
      }),
      this.categoriesRepository.countCategoriesByIconId(id),
    ]);

    if (!iconFound)
      throw new HttpError(
        `Ícone não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    if (iconFound.deletedAt)
      throw new HttpError(
        `Ícone já está removido: ${id}`,
        HttpStatusCodes['Bad Request']
      );

    if (numOfCategoriesUsingIcon > 0)
      throw new HttpError(
        `Ícone está em uso por uma ou mais categorias`,
        HttpStatusCodes['Bad Request']
      );

    await this.fileUploaderProvider.removeFile(iconFound.relativePath);

    return this.iconsRepository.deleteIcon(
      id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
