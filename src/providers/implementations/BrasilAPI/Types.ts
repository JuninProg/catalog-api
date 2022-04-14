export interface IBrasilAPICepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
}

export interface IBrasilAPIError {
  message: string;
  service: string;
}

export interface IBrasilAPIResponseError {
  name: string;
  message: string;
  type: string;
  errors: IBrasilAPIError[];
}

export interface ICepAbertoAPIResponse {
  cidade: {
    ibge: string;
    nome: string;
    ddd: number | null;
  };
  estado: {
    sigla: string;
  };
  altitude: number;
  longitude: string;
  bairro?: string;
  complemento?: string;
  cep: string;
  logradouro?: string;
  latitude: string;
}
