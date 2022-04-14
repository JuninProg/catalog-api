import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAdAction } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IConsultCategoryAdActionsDTO } from './IConsultCategoryAdActionsDTO';

export class ConsultCategoryAdActionsUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (
    data: IConsultCategoryAdActionsDTO,
    categoryAdId: number,
    customer: IDecodedCustomer | null,
    admin: IDecodedAdmin | null
  ): Promise<CategoryAdAction[] | Record<string, CategoryAdAction[]>> => {
    if (!admin && !customer)
      throw new HttpError(
        `Você não tem permissão para visualizar as ações dos anúncios das categorias`,
        HttpStatusCodes['Unauthorized']
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      categoryAdId
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${categoryAdId}`,
        HttpStatusCodes['Not Found']
      );

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para visualizar as ações desse anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    const actions = await this.categoriesRepository.listCategoriesAdsActions({
      categoryAdId,
      endDate: data.endDate,
      startDate: data.startDate,
      type: data.type,
    });

    if (data.groupByType) {
      const actionsByType: Record<string, CategoryAdAction[]> = {};

      for (const action of actions) {
        if (actionsByType[action.type]) actionsByType[action.type].push(action);
        else actionsByType[action.type] = [action];
      }

      return actionsByType;
    } else return actions;
  };
}
