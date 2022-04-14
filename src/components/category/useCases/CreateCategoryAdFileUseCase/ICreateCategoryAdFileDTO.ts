export interface ICreateCategoryAdFileRequestDTO {
  categoryAdId: number;
  type: string;
  fileType: string;
  temporaryPath: string;
}

export interface ICreateCategoryAdFileDTO {
  categoryAdId: number;
  type: string;
  fileType: string;
  relativePath: string;
  sizeInBytes: number;
  width: number | null;
  height: number | null;
}
