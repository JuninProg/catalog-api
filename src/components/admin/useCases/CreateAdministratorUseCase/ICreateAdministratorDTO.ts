export interface ICreateAdministratorRequestDTO {
  isMaster: boolean;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateAdministratorDTO {
  isMaster: boolean;
  name: string;
  phone: string;
  email: string;
  password: string;
}
