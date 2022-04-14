import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { ICustomersRepository } from '../../../customer/repositories/ICustomersRepository';
import { CategoryAd } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryAdDTO } from './ICreateCategoryAdDTO';

export class CreateCategoryAdUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private customersRepository: ICustomersRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: ICreateCategoryAdDTO,
    admin: IDecodedAdmin | null
  ): Promise<CategoryAd> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem criar anúncios nas categorias`,
        HttpStatusCodes.Unauthorized
      );

    const [categoryFound, [customerFound], numberOfSubcategories] =
      await Promise.all([
        this.categoriesRepository.findCategoryById(data.categoryId),
        this.customersRepository.listCustomers({
          lastIndex: 0,
          id: data.customerId,
        }),
        this.categoriesRepository.countSubcategories(data.categoryId),
      ]);

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

    if (!customerFound)
      throw new HttpError(
        `Cliente não encontrado pelo id: ${data.customerId}`,
        HttpStatusCodes['Not Found']
      );

    if (customerFound.deletedAt)
      throw new HttpError(
        `Cliente está removido: ${data.customerId}`,
        HttpStatusCodes['Bad Request']
      );

    if (numberOfSubcategories > 0)
      throw new HttpError(
        `Categorias que possuem subcategorias não podem ter anúncios`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.saveCategoryAd(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
