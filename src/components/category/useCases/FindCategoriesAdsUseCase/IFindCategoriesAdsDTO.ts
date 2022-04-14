import { CategoryAd } from '../../Category';

export interface IFindCategoriesAdsFilterDTO {
  page?: number;
  limit?: number;
  category?: string;
  name?: string;
  description?: string;
  lat?: number;
  long?: number;
}

export interface IFindCategoryAdDTO extends CategoryAd {
  category: string;
}
