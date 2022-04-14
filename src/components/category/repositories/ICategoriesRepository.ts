import {
  Category,
  CategoryAd,
  CategoryAdAction,
  CategoryAdAddress,
  CategoryAdFile,
  CategoryAdPhone,
} from '../Category';
import { IListCategoriesAdsActionsFilterDTO } from '../useCases/ConsultCategoryAdActionsUseCase/IConsultCategoryAdActionsDTO';
import { ICreateCategoryAdActionDTO } from '../useCases/CreateCategoryAdActionUseCase/ICreateCategoryAdActionDTO';
import { ICreateCategoryAdAddressDTO } from '../useCases/CreateCategoryAdAddressUseCase/ICreateCategoryAdAddressDTO';
import { ICreateCategoryAdFileDTO } from '../useCases/CreateCategoryAdFileUseCase/ICreateCategoryAdFileDTO';
import { ICreateCategoryAdPhoneDTO } from '../useCases/CreateCategoryAdPhoneUseCase/ICreateCategoryAdPhoneDTO';
import { ICreateCategoryAdDTO } from '../useCases/CreateCategoryAdUseCase/ICreateCategoryAdDTO';
import { ICreateCategoryDTO } from '../useCases/CreateCategoryUseCase/ICreateCategoryDTO';
import {
  IFindCategoriesAdsFilterDTO,
  IFindCategoryAdDTO,
} from '../useCases/FindCategoriesAdsUseCase/IFindCategoriesAdsDTO';
import {
  IListCategoriesAdsFilterDTO,
  IListCategoryAdDTO,
} from '../useCases/ListCategoriesAdsUseCase/IListCategoryAdDTO';
import {
  ICategory,
  IListCategoriesFilterDTO,
  IMainCategory,
} from '../useCases/ListCategoriesUseCase/IListCategoryDTO';
import { IUpdateCategoryAdAddressDTO } from '../useCases/UpdateCategoryAdAddressUseCase/IUpdateCategoryAdAddressDTO';
import { IUpdateCategoryAdFileDTO } from '../useCases/UpdateCategoryAdFileUseCase/IUpdateCategoryAdFileDTO';
import { IUpdateCategoryAdPhoneDTO } from '../useCases/UpdateCategoryAdPhoneUseCase/IUpdateCategoryAdPhoneDTO';
import { IUpdateCategoryAdDTO } from '../useCases/UpdateCategoryAdUseCase/IUpdateCategoryAdDTO';
import { IUpdateCategoryDTO } from '../useCases/UpdateCategoryUseCase/IUpdateCategoryDTO';

export interface ICategoriesRepository {
  saveCategory(data: ICreateCategoryDTO, createdAt: Date): Promise<Category>;
  findCategoryById(id: number): Promise<Category | null>;
  listCategories(
    data: Pick<IListCategoriesFilterDTO, 'id' | 'nonMain' | 'nonDeleted'>
  ): Promise<ICategory[]>;
  listMainCategories(
    data: Pick<
      IListCategoriesFilterDTO,
      'id' | 'lat' | 'long' | 'nonDeleted' | 'page' | 'limit'
    >
  ): Promise<IMainCategory[]>;
  updateCategory(data: IUpdateCategoryDTO, updatedAt: Date): Promise<Category>;
  deleteCategory(id: number, deletedAt: Date): Promise<Category>;
  restoreCategory(id: number): Promise<Category>;
  countSubcategories(categoryId: number): Promise<number>;
  saveCategoryAd(
    data: ICreateCategoryAdDTO,
    createdAt: Date
  ): Promise<CategoryAd>;
  listCategoriesAds(
    data: IListCategoriesAdsFilterDTO
  ): Promise<IListCategoryAdDTO[]>;
  findCategoryAdById(id: number): Promise<CategoryAd | null>;
  updateCategoryAd(
    data: IUpdateCategoryAdDTO,
    updatedAt: Date
  ): Promise<CategoryAd>;
  deleteCategoryAd(id: number, deletedAt: Date): Promise<CategoryAd>;
  restoreCategoryAd(id: number): Promise<CategoryAd>;
  saveCategoryAdPhone(
    data: ICreateCategoryAdPhoneDTO,
    createdAt: Date
  ): Promise<CategoryAdPhone>;
  updateCategoryAdPhone(
    data: IUpdateCategoryAdPhoneDTO,
    updatedAt: Date
  ): Promise<CategoryAdPhone>;
  findCategoryAdPhoneById(id: number): Promise<CategoryAdPhone | null>;
  deleteCategoryAdPhone(id: number, deletedAt: Date): Promise<CategoryAdPhone>;
  saveCategoryAdAddress(
    data: ICreateCategoryAdAddressDTO,
    createdAt: Date
  ): Promise<CategoryAdAddress>;
  updateCategoryAdAddress(
    data: IUpdateCategoryAdAddressDTO,
    updatedAt: Date
  ): Promise<CategoryAdAddress>;
  findCategoryAdAddressById(id: number): Promise<CategoryAdAddress | null>;
  deleteCategoryAdAddress(
    id: number,
    deletedAt: Date
  ): Promise<CategoryAdAddress>;
  countCategoriesByAddressId(addressId: number): Promise<number>;
  countCategoriesByIconId(iconId: number): Promise<number>;
  saveCategoryAdFile(
    data: ICreateCategoryAdFileDTO,
    createdAt: Date
  ): Promise<CategoryAdFile>;
  findCategoryAdFileById(id: number): Promise<CategoryAdFile | null>;
  updateCategoryAdFile(
    data: IUpdateCategoryAdFileDTO,
    updatedAt: Date
  ): Promise<CategoryAdFile>;
  deleteCategoryAdFile(id: number, deletedAt: Date): Promise<CategoryAdFile>;
  saveCategoryAdAction(
    data: ICreateCategoryAdActionDTO,
    createdAt: Date
  ): Promise<CategoryAdAction>;
  listCategoriesAdsActions(
    data: IListCategoriesAdsActionsFilterDTO
  ): Promise<CategoryAdAction[]>;
  updateCategoriesAdsActions(
    ids: number[],
    userId: number,
    updatedAt: Date
  ): Promise<CategoryAdAction[]>;
  countCategoriesAds(): Promise<number>;
  findCategoriesAds(
    data: IFindCategoriesAdsFilterDTO
  ): Promise<IFindCategoryAdDTO[]>;
  countMainCategories(
    data: Pick<IListCategoriesFilterDTO, 'nonDeleted'>
  ): Promise<number>;
}
