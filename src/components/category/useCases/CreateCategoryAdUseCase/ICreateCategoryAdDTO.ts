export interface ICreateCategoryAdDTO {
  categoryId: number;
  customerId: number;
  name: string;
  description: string | null;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  email: string | null;
}
