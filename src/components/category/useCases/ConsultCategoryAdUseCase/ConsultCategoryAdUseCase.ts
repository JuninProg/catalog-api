import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IListCategoryAdDTO } from '../ListCategoriesAdsUseCase/IListCategoryAdDTO';

export class ConsultCategoryAdUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (id: number): Promise<IListCategoryAdDTO> => {
    const [categoryAdFound] = await this.categoriesRepository.listCategoriesAds(
      { id }
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${id}`,
        HttpStatusCodes['Not Found']
      );

    return categoryAdFound;
  };
}
