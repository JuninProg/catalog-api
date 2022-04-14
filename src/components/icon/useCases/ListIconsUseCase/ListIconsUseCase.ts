import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { IIconsRepository } from '../../repositories/IIconsRepository';
import { IListIconDTO, IListIconsFilterDTO } from './IListIconDTO';

const CDN_URL = process.env.CDN_URL;

export class ListIconsUseCase {
  constructor(private iconsRepository: IIconsRepository) {}

  execute = async (
    data: IListIconsFilterDTO,
    admin: IDecodedAdmin | null
  ): Promise<IListIconDTO[]> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem listar ícones`,
        HttpStatusCodes.Unauthorized
      );

    const iconsFound = await this.iconsRepository.listIcons(data);

    const icons: IListIconDTO[] = [];

    for (const iconFound of iconsFound)
      icons.push({
        id: iconFound.id,
        fileType: iconFound.fileType,
        name: iconFound.name,
        relativePath: iconFound.relativePath,
        link: `${CDN_URL}/${iconFound.relativePath}`,
        sizeInBytes: iconFound.sizeInBytes,
        createdAt: iconFound.createdAt,
        updatedAt: iconFound.updatedAt,
        deletedAt: iconFound.deletedAt,
      });

    return icons;
  };
}
