export interface ICreateIconRequestDTO {
  name: string;
  fileType: string;
  temporaryPath: string;
}

export interface ICreateIconDTO {
  name: string;
  fileType: string;
  relativePath: string;
  sizeInBytes: number;
}
