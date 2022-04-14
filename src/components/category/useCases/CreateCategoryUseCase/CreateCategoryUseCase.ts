import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IAddressRepository } from '../../../address/repositories/IAddressRepository';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { IIconsRepository } from '../../../icon/repositories/IIconsRepository';
import { Category } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from './ICreateCategoryDTO';

export class CreateCategoryUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider,
    private addressRepository: IAddressRepository,
    private iconsRepository: IIconsRepository
  ) {}

  execute = async (
    data: ICreateCategoryDTO,
    admin: IDecodedAdmin | null
  ): Promise<Category> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem criar categorias`,
        HttpStatusCodes.Unauthorized
      );

    if (!data.categoryId && !data.addressId)
      throw new HttpError(
        `Categorias principais devem ter endereço`,
        HttpStatusCodes['Bad Request']
      );

    if (data.categoryId && data.addressId)
      throw new HttpError(
        `Subcategorias não possuem endereço`,
        HttpStatusCodes['Bad Request']
      );

    if (data.categoryId) {
      const [categoryFound] = await this.categoriesRepository.listCategories({
        id: data.categoryId,
      });

      if (!categoryFound)
        throw new HttpError(
          `Categoria não encontrada pelo id: ${data.categoryId}`,
          HttpStatusCodes['Not Found']
        );

      if (categoryFound.deletedAt)
        throw new HttpError(
          `Categoria está removida: ${data.categoryId}`,
          HttpStatusCodes['Bad Request']
        );

      if (categoryFound.haveAds)
        throw new HttpError(
          `Categoria que possui anúncios não pode ter subcategorias`,
          HttpStatusCodes['Bad Request']
        );
    }

    if (data.addressId) {
      const [addressFound] = await this.addressRepository.listAddresses({
        lastIndex: 0,
        id: data.addressId,
      });

      if (!addressFound)
        throw new HttpError(
          `Endereço não encontrado pelo id: ${data.addressId}`,
          HttpStatusCodes['Not Found']
        );

      if (addressFound.deletedAt)
        throw new HttpError(
          `Endereço está removido: ${data.addressId}`,
          HttpStatusCodes['Bad Request']
        );
    }

    const [iconFound] = await this.iconsRepository.listIcons({
      id: data.iconId,
    });

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

    return this.categoriesRepository.saveCategory(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
