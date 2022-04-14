import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { Address, STPoint } from '../../Address';
import { IAddressRepository } from '../../repositories/IAddressRepository';
import { ICreateAddressRequestDTO } from './ICreateAddressDTO';

export class CreateAddressUseCase {
  constructor(
    private addressRepository: IAddressRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: ICreateAddressRequestDTO,
    admin: IDecodedAdmin | null
  ): Promise<Address> => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem criar endereços',
        HttpStatusCodes['Unauthorized']
      );

    const [addressFound] = await this.addressRepository.listAddresses({
      lastIndex: 0,
      zipCode: data.zipCode,
    });

    if (addressFound)
      throw new HttpError(
        `Já existe um endereço com esse código postal: ${data.zipCode}`,
        HttpStatusCodes['Bad Request']
      );

    if (
      data.zipCode.substr(data.zipCode.length - 3, data.zipCode.length) !==
      '000'
    )
      throw new HttpError(
        `O código postal deve ser de cidade que termine com 000, por exemplo: ${data.zipCode.substr(
          0,
          data.zipCode.length - 3
        )}000`,
        HttpStatusCodes['Bad Request']
      );

    return this.addressRepository.saveAddress(
      {
        ...data,
        coordinates: new STPoint(data.coordinates),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
