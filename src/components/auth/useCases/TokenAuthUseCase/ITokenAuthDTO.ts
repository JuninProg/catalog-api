export interface IDecodedAdmin {
  id: number;
  name: string;
  isMaster: boolean;
}

export interface IDecodedUser {
  id: number;
  name: string;
  phone: string;
}

export interface IDecodedCustomer {
  id: number;
  name: string | null;
}

export interface ITokenPayload {
  admin: IDecodedAdmin | null;
  user: IDecodedUser | null;
  customer: IDecodedCustomer | null;
}
