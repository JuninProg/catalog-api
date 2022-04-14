export interface IResizeToWebpDTO {
  imageBuffer: Buffer;
  width: number;
  heigth: number;
  quality: number;
}

export interface IPhotoshopProvider {
  resizeToWebp(data: IResizeToWebpDTO): Promise<Buffer>;
  toWebp(imageBuffer: Buffer, quality: number): Promise<Buffer>;
  getImageDimensions(
    imageBuffer: Buffer
  ): Promise<{ width: number; height: number }>;
}
