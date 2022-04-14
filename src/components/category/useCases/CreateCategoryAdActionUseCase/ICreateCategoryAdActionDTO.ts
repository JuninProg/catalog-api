export interface ICreateCategoryAdActionDTO {
  categoryAdId: number;
  userId: number | null;
  uuid: string;
  type: string;
  description: string;
}
