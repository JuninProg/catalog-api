export interface ISaveFileDTO {
  fileBuffer: Buffer;
  dirPath: string;
  mimetype: string;
  fileExt: string;
}

export interface IFileUploaderProvider {
  saveFile(data: ISaveFileDTO): Promise<{ fileName: string }>;
  removeFile(relativePath: string): Promise<void>;
}
