import { ISearchAddressProvider } from '../../ISearchAddressProvider';
import axios from 'axios';
import { IBrasilAPICepResponse, ICepAbertoAPIResponse } from './Types';
import { IAddress, STPoint } from '../../../components/address/Address';
import { BrasilAPIErrorHandle } from './Utils';
import { HttpError, HttpStatusCodes } from '../../../errors/HttpError';

const BRASIL_API_URL =
  process.env.BRASIL_API_URL || 'https://brasilapi.com.br/api';
const CEP_ABERTO_URL =
  process.env.CEP_ABERTO_URL || 'https://www.cepaberto.com/api/v3';
const CEP_ABERTO_TOKEN = process.env.CEP_ABERTO_TOKEN || 'sometoken';

export class BrasilAPI implements ISearchAddressProvider {
  findAddressByZipCode = async (zipCode: string): Promise<IAddress> => {
    try {
      const response = await axios({
        url: `${BRASIL_API_URL}/cep/v2/${zipCode}`,
        method: 'GET',
      });

      const data = response.data as IBrasilAPICepResponse;

      const address: IAddress = {
        zipCode: data.cep,
        city: data.city,
        neighborhood:
          data.neighborhood.trim().length > 0 ? data.neighborhood : null,
        state: data.state,
        street: data.street.trim().length > 0 ? data.street : null,
        coordinates: new STPoint({
          lat: parseFloat(data.location.coordinates.latitude),
          long: parseFloat(data.location.coordinates.longitude),
        }),
        country: 'Brasil',
      };

      return address;
    } catch (error) {
      throw BrasilAPIErrorHandle(error);
    }
  };

  findAddressByCoordinates = async (
    lat: number,
    long: number
  ): Promise<IAddress> => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${CEP_ABERTO_URL}/nearest`,
        params: { lat, lng: long },
        headers: { Authorization: `Token token=${CEP_ABERTO_TOKEN}` },
      });

      const data = response.data as ICepAbertoAPIResponse;

      return {
        city: data.cidade.nome,
        country: 'Brasil',
        coordinates: new STPoint({ lat, long }),
        neighborhood: data.bairro || null,
        state: data.estado.sigla,
        street: data.logradouro || null,
        zipCode: data.cep,
      };
    } catch (error) {
      throw new HttpError(
        `Nenhum endereço foi encontrado`,
        HttpStatusCodes['Not Found']
      );
    }
  };
}
