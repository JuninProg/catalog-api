import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd, CategoryAdPhone } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IUpdateCategoryAdPhoneDTO } from './IUpdateCategoryAdPhoneDTO';

export class UpdateCategoryAdPhoneUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCategoryAdPhoneDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdPhone> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para atualizar telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdPhoneFound =
      await this.categoriesRepository.findCategoryAdPhoneById(data.id);

    if (!categoryAdPhoneFound)
      throw new HttpError(
        `Telefone do anúncio da categoria não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdPhoneFound.deletedAt)
      throw new HttpError(
        `Telefone do anúncio da categoria está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const categoryAdFound = (await this.categoriesRepository.findCategoryAdById(
      categoryAdPhoneFound.categoryAdId
    )) as CategoryAd;

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para atualizar telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${categoryAdPhoneFound.categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.updateCategoryAdPhone(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
