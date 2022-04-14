import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import {
  IListCategoriesAdsFilterDTO,
  IListCategoryAdDTO,
} from './IListCategoryAdDTO';

export class ListCategoriesAdsUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = (
    data: IListCategoriesAdsFilterDTO
  ): Promise<IListCategoryAdDTO[]> => {
    if ((data.lat && !data.long) || (data.long && !data.lat))
      throw new HttpError(
        `Latitude e longitude devem estar presente juntos`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.listCategoriesAds(data);
  };
}
