import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { STPoint } from '../../Address';
import { IAddressRepository } from '../../repositories/IAddressRepository';
import { IUpdateAddressRequestDTO } from './IUpdateAddressDTO';

export class UpdateAddressUseCase {
  constructor(
    private addressRepository: IAddressRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateAddressRequestDTO,
    admin: IDecodedAdmin | null
  ) => {
    if (!admin)
      throw new HttpError(
        'Somente administradores podem atualizar o endereço',
        HttpStatusCodes.Unauthorized
      );

    const [addressFound] = await this.addressRepository.listAddresses({
      id: data.id,
      lastIndex: 0,
    });

    if (!addressFound)
      throw new HttpError(
        `Endereço não encontrado pelo id: ${data.id}`,
        HttpStatusCodes['Not Found']
      );

    if (addressFound.deletedAt)
      throw new HttpError(
        `Endereço está removido: ${data.id}`,
        HttpStatusCodes['Bad Request']
      );

    const [sameZipCodeAddress] = await this.addressRepository.listAddresses({
      lastIndex: 0,
      zipCode: data.zipCode,
    });

    if (sameZipCodeAddress && sameZipCodeAddress.id !== addressFound.id)
      throw new HttpError(
        `Código postal em uso por outro endereço: ${data.zipCode}`,
        HttpStatusCodes['Bad Request']
      );

    return this.addressRepository.updateAddress(
      {
        ...data,
        coordinates: new STPoint(data.coordinates),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
