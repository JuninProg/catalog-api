import { STPoint } from '../../../address/Address';
import { Category } from '../../Category';

export interface IListCategoriesFilterDTO {
  id?: number;
  lat?: number;
  long?: number;
  nonMain?: true;
  nonDeleted?: true;
  page?: number;
  limit?: number;
}

export interface ICategory extends Category {
  haveAds: boolean;
  iconId: number;
  iconRelativePath: string;
}

export interface IMainCategory extends ICategory {
  addressId: number;
  addressZipCode: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressCoordinates: STPoint;
}

export interface IListCategoryDTO
  extends Omit<IMainCategory, 'iconRelativePath'> {
  iconLink: string;
  subcategories: Omit<
    IListCategoryDTO,
    | 'addressId'
    | 'addressZipCode'
    | 'addressCity'
    | 'addressState'
    | 'addressCountry'
    | 'addressCoordinates'
  >[];
}
