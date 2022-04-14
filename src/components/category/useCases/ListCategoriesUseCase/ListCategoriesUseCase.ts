import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import {
  ICategory,
  IListCategoriesFilterDTO,
  IListCategoryDTO,
  IMainCategory,
} from './IListCategoryDTO';

const CDN_URL = process.env.CDN_URL;

function traverse(
  categories: ICategory[],
  parentId: number
): Omit<
  IListCategoryDTO,
  | 'addressId'
  | 'addressZipCode'
  | 'addressCity'
  | 'addressState'
  | 'addressCountry'
  | 'addressCoordinates'
>[] {
  const subcategories: Omit<
    IListCategoryDTO,
    | 'addressId'
    | 'addressZipCode'
    | 'addressCity'
    | 'addressState'
    | 'addressCountry'
    | 'addressCoordinates'
  >[] = [];

  for (const category of categories) {
    if (category.categoryId === parentId)
      subcategories.push({
        id: category.id,
        categoryId: category.categoryId,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        deletedAt: category.deletedAt,
        haveAds: category.haveAds,
        iconId: category.iconId,
        iconLink: `${CDN_URL}/${category.iconRelativePath}`,
        subcategories: traverse(categories, category.id),
      });
  }

  return subcategories;
}

function buildTree(
  mainCategories: IMainCategory[],
  nonMainCategories: ICategory[]
): IListCategoryDTO[] {
  const categories: IListCategoryDTO[] = [];

  for (const mainCategory of mainCategories) {
    categories.push({
      id: mainCategory.id,
      name: mainCategory.name,
      categoryId: mainCategory.categoryId,
      haveAds: mainCategory.haveAds,
      addressId: mainCategory.addressId,
      addressCity: mainCategory.addressCity,
      addressCoordinates: mainCategory.addressCoordinates,
      addressCountry: mainCategory.addressCountry,
      addressState: mainCategory.addressState,
      addressZipCode: mainCategory.addressZipCode,
      iconId: mainCategory.iconId,
      iconLink: `${CDN_URL}/${mainCategory.iconRelativePath}`,
      createdAt: mainCategory.createdAt,
      updatedAt: mainCategory.updatedAt,
      deletedAt: mainCategory.deletedAt,
      subcategories: traverse(nonMainCategories, mainCategory.id),
    });
  }

  return categories;
}

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute = async (
    data: IListCategoriesFilterDTO
  ): Promise<{ total: number; categories: IListCategoryDTO[] }> => {
    if ((data.lat && !data.long) || (data.long && !data.lat))
      throw new HttpError(
        `Latitude e longitude devem estar presente juntos`,
        HttpStatusCodes['Bad Request']
      );

    if ((data.limit && !data.page) || (data.page && !data.limit))
      throw new HttpError(
        'Página e limite devem estar presente juntos para aplicar paginação',
        HttpStatusCodes['Bad Request']
      );

    const [mainCategories, nonMainCategories, totalMainCategories] =
      await Promise.all([
        this.categoriesRepository.listMainCategories({
          lat: data.lat,
          long: data.long,
          nonDeleted: data.nonDeleted,
          page: data.page,
          limit: data.limit,
        }),
        this.categoriesRepository.listCategories({
          nonMain: true,
          nonDeleted: data.nonDeleted,
        }),
        this.categoriesRepository.countMainCategories({
          nonDeleted: data.nonDeleted,
        }),
      ]);

    const categories = buildTree(mainCategories, nonMainCategories);

    return {
      total: totalMainCategories,
      categories,
    };
  };
}
