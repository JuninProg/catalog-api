import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import {
  IFindCategoriesAdsFilterDTO,
  IFindCategoryAdDTO,
} from './IFindCategoriesAdsDTO';

export class FindCategoriesAdsUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (
    data: IFindCategoriesAdsFilterDTO
  ): Promise<{ total: number; ads: IFindCategoryAdDTO[] }> => {
    if ((data.limit && !data.page) || (data.page && !data.limit))
      throw new HttpError(
        'Página e limite devem estar presente juntos para aplicar paginação',
        HttpStatusCodes['Bad Request']
      );

    if ((data.lat && !data.long) || (data.long && !data.lat))
      throw new HttpError(
        `Latitude e longitude devem estar presente juntos`,
        HttpStatusCodes['Bad Request']
      );

    const [totalAds, adsFound] = await Promise.all([
      this.categoriesRepository.countCategoriesAds(),
      this.categoriesRepository.findCategoriesAds(data),
    ]);

    return {
      total: totalAds,
      ads: adsFound,
    };
  };
}
