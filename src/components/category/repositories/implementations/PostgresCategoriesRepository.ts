import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { GeoJSON } from '../../../address/Address';
import {
  Category,
  CategoryAd,
  CategoryAdAction,
  CategoryAdAddress,
  CategoryAdFile,
  CategoryAdPhone,
} from '../../Category';
import { IListCategoriesAdsActionsFilterDTO } from '../../useCases/ConsultCategoryAdActionsUseCase/IConsultCategoryAdActionsDTO';
import { ICreateCategoryAdActionDTO } from '../../useCases/CreateCategoryAdActionUseCase/ICreateCategoryAdActionDTO';
import { ICreateCategoryAdAddressDTO } from '../../useCases/CreateCategoryAdAddressUseCase/ICreateCategoryAdAddressDTO';
import { ICreateCategoryAdFileDTO } from '../../useCases/CreateCategoryAdFileUseCase/ICreateCategoryAdFileDTO';
import { ICreateCategoryAdPhoneDTO } from '../../useCases/CreateCategoryAdPhoneUseCase/ICreateCategoryAdPhoneDTO';
import { ICreateCategoryAdDTO } from '../../useCases/CreateCategoryAdUseCase/ICreateCategoryAdDTO';
import { ICreateCategoryDTO } from '../../useCases/CreateCategoryUseCase/ICreateCategoryDTO';
import {
  IFindCategoriesAdsFilterDTO,
  IFindCategoryAdDTO,
} from '../../useCases/FindCategoriesAdsUseCase/IFindCategoriesAdsDTO';
import {
  ICategoryAdFile,
  IListCategoriesAdsFilterDTO,
  IListCategoryAdDTO,
} from '../../useCases/ListCategoriesAdsUseCase/IListCategoryAdDTO';
import {
  ICategory,
  IListCategoriesFilterDTO,
  IMainCategory,
} from '../../useCases/ListCategoriesUseCase/IListCategoryDTO';
import { IUpdateCategoryAdAddressDTO } from '../../useCases/UpdateCategoryAdAddressUseCase/IUpdateCategoryAdAddressDTO';
import { IUpdateCategoryAdFileDTO } from '../../useCases/UpdateCategoryAdFileUseCase/IUpdateCategoryAdFileDTO';
import { IUpdateCategoryAdPhoneDTO } from '../../useCases/UpdateCategoryAdPhoneUseCase/IUpdateCategoryAdPhoneDTO';
import { IUpdateCategoryAdDTO } from '../../useCases/UpdateCategoryAdUseCase/IUpdateCategoryAdDTO';
import { IUpdateCategoryDTO } from '../../useCases/UpdateCategoryUseCase/IUpdateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';
import {
  buildCountMainCategories,
  buildFindCategoriesAdsQuery,
  buildListCategoriesAdsActionsQuery,
  buildListCategoriesAdsQuery,
  buildListCategoriesQuery,
  buildListMainCategoriesQuery,
} from './Factory';
import {
  countSubcategoriesQuery,
  insertCategoryAdAddressQuery,
  insertCategoryAdPhoneQuery,
  insertCategoryAdQuery,
  insertCategoryQuery,
  restoreCategoryAdQuery,
  restoreCategoryQuery,
  selectCategoryAdByIdQuery,
  selectCategoryAdAddressByIdQuery,
  selectCategoryAdPhoneByIdQuery,
  selectCategoryByIdQuery,
  softDeleteCategoryAdAddressQuery,
  softDeleteCategoryAdPhoneQuery,
  softDeleteCategoryAdQuery,
  softDeleteCategoryQuery,
  updateCategoryAdQuery,
  updateCategoryQuery,
  countCategoriesByAddressIdQuery,
  countCategoriesByIconIdQuery,
  updateCategoryAdAddressQuery,
  updateCategoryAdPhoneQuery,
  insertCategoryAdFileQuery,
  selectCategoryAdFileByIdQuery,
  updateCategoryAdFileQuery,
  softDeleteCategoryAdFileQuery,
  insertCategoryAdActionQuery,
  updateCategoryAdActionQuery,
  countCategoriesAdsQuery,
} from './queries';

const CDN_URL = process.env.CDN_URL;

export class PostgresCategoriesRepository implements ICategoriesRepository {
  constructor(private database: IDatabase<Record<string, unknown>, IClient>) {}

  saveCategory = async (
    data: ICreateCategoryDTO,
    createdAt: Date
  ): Promise<Category> => {
    const createdCategory = await this.database.one(insertCategoryQuery, {
      ...data,
      createdAt,
    });

    return new Category(createdCategory);
  };

  listCategories = (
    data: Pick<IListCategoriesFilterDTO, 'id' | 'nonMain' | 'nonDeleted'>
  ): Promise<ICategory[]> => {
    const { query: selectCategoriesQuery, values } =
      buildListCategoriesQuery(data);

    return this.database.map(
      selectCategoriesQuery,
      values,
      (row): ICategory => ({
        id: row.id,
        categoryId: row.categoryId,
        haveAds: row.haveAds,
        name: row.name,
        iconId: row.iconId,
        addressId: row.addressId,
        iconRelativePath: row.iconRelativePath,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      })
    );
  };

  listMainCategories = async (
    data: Pick<
      IListCategoriesFilterDTO,
      'id' | 'lat' | 'long' | 'nonDeleted' | 'page' | 'limit'
    >
  ): Promise<IMainCategory[]> => {
    const { query: selectMainCategoriesQuery, values } =
      buildListMainCategoriesQuery(data);

    return this.database.map(
      selectMainCategoriesQuery,
      values,
      (row): IMainCategory => ({
        id: row.id,
        categoryId: row.categoryId,
        name: row.name,
        addressCity: row.addressCity,
        addressCoordinates: new GeoJSON(row.addressCoordinates).toSTPoint(),
        addressCountry: row.addressCountry,
        addressId: row.addressId,
        addressState: row.addressState,
        addressZipCode: row.addressZipCode,
        haveAds: row.haveAds,
        iconId: row.iconId,
        iconRelativePath: row.iconRelativePath,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      })
    );
  };

  findCategoryById = async (id: number): Promise<Category | null> => {
    const categoryFound = await this.database.oneOrNone(
      selectCategoryByIdQuery,
      { id }
    );

    return categoryFound ? new Category(categoryFound) : null;
  };

  updateCategory = async (
    data: IUpdateCategoryDTO,
    updatedAt: Date
  ): Promise<Category> => {
    const updatedCategory = await this.database.one(updateCategoryQuery, {
      ...data,
      updatedAt,
    });

    return new Category(updatedCategory);
  };

  deleteCategory = async (id: number, deletedAt: Date): Promise<Category> => {
    const deletedCategory = await this.database.one(softDeleteCategoryQuery, {
      id,
      deletedAt,
    });

    return new Category(deletedCategory);
  };

  restoreCategory = async (id: number): Promise<Category> => {
    const restoredCategory = await this.database.one(restoreCategoryQuery, {
      id,
    });

    return new Category(restoredCategory);
  };

  countSubcategories = async (categoryId: number): Promise<number> => {
    const countedSubcategories = await this.database.one(
      countSubcategoriesQuery,
      { categoryId }
    );

    return parseInt(countedSubcategories.totalOfSubcategories);
  };

  saveCategoryAd = async (
    data: ICreateCategoryAdDTO,
    createdAt: Date
  ): Promise<CategoryAd> => {
    const createdCategoryAd = await this.database.one(insertCategoryAdQuery, {
      ...data,
      createdAt,
    });

    return new CategoryAd(createdCategoryAd);
  };

  listCategoriesAds = async (
    data: IListCategoriesAdsFilterDTO
  ): Promise<IListCategoryAdDTO[]> => {
    const { query: selectCategoriesAdsQuery, values } =
      buildListCategoriesAdsQuery(data);

    const categoriesAds: IListCategoryAdDTO[] = [];

    await this.database.map(selectCategoriesAdsQuery, values, (row) => {
      const categoryAd = new CategoryAd({
        id: row.adId,
        categoryId: row.adCategoryId,
        customerId: row.adCustomerId,
        description: row.adDescription,
        email: row.adEmail,
        facebook: row.adFacebook,
        instagram: row.adInstagram,
        name: row.adName,
        website: row.adWebsite,
        createdAt: row.adCreatedAt,
        updatedAt: row.adUpdatedAt,
        deletedAt: row.adDeletedAt,
      });

      const categoryAdAddress: CategoryAdAddress | null = row.adAddressId
        ? new CategoryAdAddress({
            id: row.adAddressId,
            categoryAdId: row.adAddressCategoryAdId,
            city: row.adAddressCity,
            complement: row.adAddressComplement,
            coordinates: new GeoJSON(row.adAddressCoordinates).toSTPoint(),
            country: row.adAddressCountry,
            number: row.adAddressNumber,
            state: row.adAddressState,
            street: row.adAddressStreet,
            zipCode: row.adAddressZipCode,
            neighborhood: row.adAddressNeighborhood,
            createdAt: row.adAddressCreatedAt,
            updatedAt: row.adAddressUpdatedAt,
            deletedAt: row.adAddressDeletedAt,
          })
        : null;

      const categoryAdPhone: CategoryAdPhone | null = row.adPhoneId
        ? new CategoryAdPhone({
            id: row.adPhoneId,
            categoryAdId: row.adPhoneCategoryAdId,
            isWhatsapp: row.adPhoneIsWhatsapp,
            phone: row.adPhonePhone,
            createdAt: row.adPhoneCreatedAt,
            updatedAt: row.adPhoneUpdatedAt,
            deletedAt: row.adPhoneDeletedAt,
          })
        : null;

      const categoryAdFile: ICategoryAdFile | null = row.fileId
        ? {
            id: row.fileId,
            categoryAdId: row.fileCategoryAdId,
            fileType: row.fileFileType,
            link: `${CDN_URL}/${row.fileRelativePath}`,
            relativePath: row.fileRelativePath,
            sizeInBytes: row.fileSizeInBytes,
            type: row.fileType,
            width: row.fileWidth,
            height: row.fileHeight,
            createdAt: row.fileCreatedAt,
            updatedAt: row.fileUpdatedAt,
            deletedAt: row.fileDeletedAt,
          }
        : null;

      let indexOfCategoryAd;

      const categoryAdFound = categoriesAds.find(
        (categoryAdFound) => categoryAdFound.id === categoryAd.id
      );

      if (categoryAdFound)
        indexOfCategoryAd = categoriesAds.indexOf(categoryAdFound);
      else {
        const categoryAdToAdd: IListCategoryAdDTO = {
          id: categoryAd.id,
          categoryId: categoryAd.categoryId,
          customerId: categoryAd.customerId,
          description: categoryAd.description,
          email: categoryAd.email,
          facebook: categoryAd.facebook,
          instagram: categoryAd.instagram,
          name: categoryAd.name,
          website: categoryAd.website,
          createdAt: categoryAd.createdAt,
          updatedAt: categoryAd.updatedAt,
          deletedAt: categoryAd.deletedAt,
          phones: [],
          addresses: [],
          files: {},
        };
        categoriesAds.push(categoryAdToAdd);
        indexOfCategoryAd = categoriesAds.indexOf(categoryAdToAdd);
      }

      if (categoryAdPhone) {
        const phoneFound = categoriesAds[indexOfCategoryAd].phones.find(
          (phone) => phone.id === categoryAdPhone.id
        );

        if (!phoneFound)
          categoriesAds[indexOfCategoryAd].phones.push(categoryAdPhone);
      }

      if (categoryAdAddress) {
        const addressFound = categoriesAds[indexOfCategoryAd].addresses.find(
          (address) => address.id === categoryAdAddress.id
        );

        if (!addressFound)
          categoriesAds[indexOfCategoryAd].addresses.push(categoryAdAddress);
      }

      if (categoryAdFile) {
        const fileArray =
          categoriesAds[indexOfCategoryAd].files[categoryAdFile.type];

        if (Array.isArray(fileArray)) {
          const fileFound = categoriesAds[indexOfCategoryAd].files[
            categoryAdFile.type
          ].find((fileFound) => fileFound.id === categoryAdFile.id);
          if (!fileFound)
            categoriesAds[indexOfCategoryAd].files[categoryAdFile.type].push(
              categoryAdFile
            );
        } else
          categoriesAds[indexOfCategoryAd].files[categoryAdFile.type] = [
            categoryAdFile,
          ];
      }
    });

    return categoriesAds;
  };

  deleteCategoryAd = async (
    id: number,
    deletedAt: Date
  ): Promise<CategoryAd> => {
    const deletedCategoryAd = await this.database.one(
      softDeleteCategoryAdQuery,
      { id, deletedAt }
    );

    return new CategoryAd(deletedCategoryAd);
  };

  findCategoryAdById = async (id: number): Promise<CategoryAd | null> => {
    const categoryAdFound = await this.database.oneOrNone(
      selectCategoryAdByIdQuery,
      { id }
    );

    return categoryAdFound ? new CategoryAd(categoryAdFound) : null;
  };

  restoreCategoryAd = async (id: number): Promise<CategoryAd> => {
    const restoredCategoryAd = await this.database.one(restoreCategoryAdQuery, {
      id,
    });

    return new CategoryAd(restoredCategoryAd);
  };

  updateCategoryAd = async (
    data: IUpdateCategoryAdDTO,
    updatedAt: Date
  ): Promise<CategoryAd> => {
    const updatedCategoryAd = await this.database.one(updateCategoryAdQuery, {
      ...data,
      updatedAt,
    });

    return new CategoryAd(updatedCategoryAd);
  };

  saveCategoryAdPhone = async (
    data: ICreateCategoryAdPhoneDTO,
    createdAt: Date
  ): Promise<CategoryAdPhone> => {
    const createdCategoryAdPhone = await this.database.one(
      insertCategoryAdPhoneQuery,
      { ...data, createdAt }
    );

    return new CategoryAdPhone(createdCategoryAdPhone);
  };

  findCategoryAdPhoneById = async (
    id: number
  ): Promise<CategoryAdPhone | null> => {
    const categoryAdPhoneFound = await this.database.oneOrNone(
      selectCategoryAdPhoneByIdQuery,
      { id }
    );

    return categoryAdPhoneFound
      ? new CategoryAdPhone(categoryAdPhoneFound)
      : null;
  };

  deleteCategoryAdPhone = async (
    id: number,
    deletedAt: Date
  ): Promise<CategoryAdPhone> => {
    const deletedCategoryAdPhone = await this.database.one(
      softDeleteCategoryAdPhoneQuery,
      { id, deletedAt }
    );

    return new CategoryAdPhone(deletedCategoryAdPhone);
  };

  saveCategoryAdAddress = async (
    data: ICreateCategoryAdAddressDTO,
    createdAt: Date
  ): Promise<CategoryAdAddress> => {
    const createdCategoryAdAddress = await this.database.one(
      insertCategoryAdAddressQuery,
      { ...data, createdAt }
    );

    return new CategoryAdAddress({
      ...createdCategoryAdAddress,
      coordinates: new GeoJSON(
        createdCategoryAdAddress.coordinates
      ).toSTPoint(),
    });
  };

  findCategoryAdAddressById = async (
    id: number
  ): Promise<CategoryAdAddress | null> => {
    const categoryAdAddressFound = await this.database.oneOrNone(
      selectCategoryAdAddressByIdQuery,
      { id }
    );

    return categoryAdAddressFound
      ? new CategoryAdAddress({
          ...categoryAdAddressFound,
          coordinates: new GeoJSON(
            categoryAdAddressFound.coordinates
          ).toSTPoint(),
        })
      : null;
  };

  deleteCategoryAdAddress = async (
    id: number,
    deletedAt: Date
  ): Promise<CategoryAdAddress> => {
    const deletedCategoryAdAddress = await this.database.one(
      softDeleteCategoryAdAddressQuery,
      { id, deletedAt }
    );

    return new CategoryAdAddress({
      ...deletedCategoryAdAddress,
      coordinates: new GeoJSON(
        deletedCategoryAdAddress.coordinates
      ).toSTPoint(),
    });
  };

  countCategoriesByAddressId = async (addressId: number): Promise<number> => {
    const countedCategories = await this.database.one(
      countCategoriesByAddressIdQuery,
      {
        addressId,
      }
    );

    return parseInt(countedCategories.totalOfCategories);
  };

  countCategoriesByIconId = async (iconId: number): Promise<number> => {
    const countedCategories = await this.database.one(
      countCategoriesByIconIdQuery,
      {
        iconId,
      }
    );

    return parseInt(countedCategories.totalOfCategories);
  };

  updateCategoryAdAddress = async (
    data: IUpdateCategoryAdAddressDTO,
    updatedAt: Date
  ): Promise<CategoryAdAddress> => {
    const updatedCategoryAdAddress = await this.database.one(
      updateCategoryAdAddressQuery,
      { ...data, updatedAt }
    );

    return new CategoryAdAddress({
      ...updatedCategoryAdAddress,
      coordinates: new GeoJSON(
        updatedCategoryAdAddress.coordinates
      ).toSTPoint(),
    });
  };

  updateCategoryAdPhone = async (
    data: IUpdateCategoryAdPhoneDTO,
    updatedAt: Date
  ): Promise<CategoryAdPhone> => {
    const updatedCategoryAdPhone = await this.database.one(
      updateCategoryAdPhoneQuery,
      { ...data, updatedAt }
    );

    return new CategoryAdPhone(updatedCategoryAdPhone);
  };

  saveCategoryAdFile = async (
    data: ICreateCategoryAdFileDTO,
    createdAt: Date
  ): Promise<CategoryAdFile> => {
    const createdCategoryAdFile = await this.database.one(
      insertCategoryAdFileQuery,
      { ...data, createdAt }
    );

    return new CategoryAdFile(createdCategoryAdFile);
  };

  findCategoryAdFileById = async (
    id: number
  ): Promise<CategoryAdFile | null> => {
    const categoryAdFileFound = await this.database.oneOrNone(
      selectCategoryAdFileByIdQuery,
      { id }
    );

    return categoryAdFileFound ? new CategoryAdFile(categoryAdFileFound) : null;
  };

  updateCategoryAdFile = async (
    data: IUpdateCategoryAdFileDTO,
    updatedAt: Date
  ): Promise<CategoryAdFile> => {
    const updatedCategoryAdFile = await this.database.one(
      updateCategoryAdFileQuery,
      { ...data, updatedAt }
    );

    return new CategoryAdFile(updatedCategoryAdFile);
  };

  deleteCategoryAdFile = async (
    id: number,
    deletedAt: Date
  ): Promise<CategoryAdFile> => {
    const deletedCategoryAdFile = await this.database.one(
      softDeleteCategoryAdFileQuery,
      { id, deletedAt }
    );

    return new CategoryAdFile(deletedCategoryAdFile);
  };

  saveCategoryAdAction = async (
    data: ICreateCategoryAdActionDTO,
    createdAt: Date
  ): Promise<CategoryAdAction> => {
    const createdCategoryAdAction = await this.database.one(
      insertCategoryAdActionQuery,
      { ...data, createdAt }
    );

    return new CategoryAdAction(createdCategoryAdAction);
  };

  listCategoriesAdsActions = (
    data: IListCategoriesAdsActionsFilterDTO
  ): Promise<CategoryAdAction[]> => {
    const { query: selectCategoryAdActionsQuery, values } =
      buildListCategoriesAdsActionsQuery(data);

    return this.database.map(
      selectCategoryAdActionsQuery,
      values,
      (row) => new CategoryAdAction(row)
    );
  };

  updateCategoriesAdsActions = (
    ids: number[],
    userId: number,
    updatedAt: Date
  ): Promise<CategoryAdAction[]> =>
    this.database.tx(async (conn) => {
      const updateQueries = ids.map((id) =>
        conn.one(updateCategoryAdActionQuery, { id, userId, updatedAt })
      );

      const updatedActions = await conn.batch(updateQueries);

      return updatedActions.map(
        (updatedAction) => new CategoryAdAction(updatedAction)
      );
    });

  countCategoriesAds = async (): Promise<number> => {
    const { totalAds } = await this.database.one(countCategoriesAdsQuery);
    return parseInt(totalAds);
  };

  findCategoriesAds = async (
    data: IFindCategoriesAdsFilterDTO
  ): Promise<IFindCategoryAdDTO[]> => {
    const { query: findCategoriesAdsQuery, values } =
      buildFindCategoriesAdsQuery(data);
    return this.database.map(findCategoriesAdsQuery, values, (row) => ({
      id: row.id,
      category: row.category,
      categoryId: row.categoryId,
      customerId: row.customerId,
      description: row.description,
      email: row.email,
      facebook: row.facebook,
      instagram: row.instagram,
      name: row.name,
      website: row.website,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    }));
  };

  countMainCategories = async (
    data: Pick<IListCategoriesFilterDTO, 'nonDeleted'>
  ): Promise<number> => {
    const { query: countMainCategoriesQuery, values } =
      buildCountMainCategories(data);
    const { totalCategories } = await this.database.one(
      countMainCategoriesQuery,
      values
    );
    return parseInt(totalCategories);
  };
}
