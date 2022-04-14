import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { STPoint } from '../../../address/Address';
import { IAddressRepository } from '../../../address/repositories/IAddressRepository';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAd, CategoryAdAddress } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { findMainCategory } from '../CreateCategoryAdAddressUseCase/CreateCategoryAdAddressUseCase';
import { IUpdateCategoryAdAddressRequestDTO } from './IUpdateCategoryAdAddressDTO';

export class UpdateCategoryAdAddressUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private addressRepository: IAddressRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCategoryAdAddressRequestDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdAddress> => {
    if (!admin && !customer)
      throw new HttpError(
        'Você não tem permissão para atualizar endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const categoryAdAddressFound =
      await this.categoriesRepository.findCategoryAdAddressById(data.id);

    if (!categoryAdAddressFound)
      throw new HttpError(
        `Endereço do anúncio não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdAddressFound.deletedAt)
      throw new HttpError(
        `Endereço do anúncio está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const categoryAdFound = (await this.categoriesRepository.findCategoryAdById(
      categoryAdAddressFound.categoryAdId
    )) as CategoryAd;

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para atualizar endereço do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${categoryAdAddressFound.categoryAdId}`,
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

    return this.categoriesRepository.updateCategoryAdAddress(
      {
        ...data,
        coordinates: new STPoint(data.coordinates),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
