import {
  CategoryAd,
  CategoryAdAddress,
  CategoryAdFile,
  CategoryAdPhone,
} from '../../Category';

export interface IListCategoriesAdsFilterDTO {
  id?: number;
  categoryId?: number;
  lat?: number;
  long?: number;
}

export interface ICategoryAdFile extends CategoryAdFile {
  link: string;
}

export interface IListCategoryAdDTO extends CategoryAd {
  phones: CategoryAdPhone[];
  addresses: CategoryAdAddress[];
  files: Record<string, ICategoryAdFile[]>;
}
