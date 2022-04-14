import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { ISearchAddressProvider } from '../../../../providers/ISearchAddressProvider';
import { IAddress } from '../../Address';
import { IConsultAddressDTO } from './IConsultAddressDTO';

export class ConsultAddressUseCase {
  constructor(private searchAddressProvider: ISearchAddressProvider) {}

  execute = (data: IConsultAddressDTO): Promise<IAddress> => {
    if (data.zipCode)
      return this.searchAddressProvider.findAddressByZipCode(data.zipCode);
    else if (data.lat && data.long)
      return this.searchAddressProvider.findAddressByCoordinates(
        data.lat,
        data.long
      );
    else
      throw new HttpError(
        `Deve ser fornecido ou um CEP ou coordenadas`,
        HttpStatusCodes['Bad Request']
      );
  };
}
