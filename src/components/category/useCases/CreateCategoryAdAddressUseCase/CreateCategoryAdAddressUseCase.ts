import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { STPoint } from '../../../address/Address';
import { IAddressRepository } from '../../../address/repositories/IAddressRepository';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Category, CategoryAdAddress } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryAdAddressRequestDTO } from './ICreateCategoryAdAddressDTO';

export async function findMainCategory(
  categoryId: number,
  findCategory: ICategoriesRepository['findCategoryById']
): Promise<Category> {
  const categoryFound = (await findCategory(categoryId)) as Category;

  if (!categoryFound.addressId && categoryFound.categoryId)
    return findMainCategory(categoryFound.categoryId, findCategory);
  else return categoryFound;
}

export class CreateCategoryAdAddressUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider,
    private addressRepository: IAddressRepository
  ) {}

  execute = async (
    data: ICreateCategoryAdAddressRequestDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdAddress> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para criar endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      data.categoryAdId
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${data.categoryAdId}`,
        HttpStatusCodes['Not Found']
      );

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para criar endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${data.categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    const mainCategory = await findMainCategory(
      categoryAdFound.categoryId,
      this.categoriesRepository.findCategoryById
    );

    const [addressFound] = await this.addressRepository.listAddresses({
      lastIndex: 0,
      id: mainCategory.addressId as number,
    });

    if (addressFound.zipCode.substr(0, 5) !== data.zipCode.substr(0, 5))
      throw new HttpError(
        `O endereço do anúncio da categoria deve ser na mesma cidade que o anúncio da categoria`,
        HttpStatusCodes['Bad Request']
      );

    return this.categoriesRepository.saveCategoryAdAddress(
      {
        ...data,
        coordinates: new STPoint(data.coordinates),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
