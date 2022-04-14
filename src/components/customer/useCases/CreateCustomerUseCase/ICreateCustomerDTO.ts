export interface ICreateCustomerRequestDTO {
  name: string | null;
  phone: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateCustomerDTO {
  name: string | null;
  phone: string | null;
  email: string;
  password: string;
}
