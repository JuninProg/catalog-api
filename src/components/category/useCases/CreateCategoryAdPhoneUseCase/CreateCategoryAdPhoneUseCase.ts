import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAdPhone } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryAdPhoneDTO } from './ICreateCategoryAdPhoneDTO';

export class CreateCategoryAdPhoneUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: ICreateCategoryAdPhoneDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdPhone> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para criar telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      data.categoryAdId
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${data.categoryAdId}`,
        HttpStatusCodes['Not Found']
      );

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para criar telefone do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${data.categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.saveCategoryAdPhone(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
