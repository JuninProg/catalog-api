import { IPhotoshopProvider, IResizeToWebpDTO } from '../IPhotoshopProvider';
import sharp from 'sharp';

export class Sharp implements IPhotoshopProvider {
  resizeToWebp = (data: IResizeToWebpDTO): Promise<Buffer> =>
    sharp(data.imageBuffer)
      .resize({
        height: data.heigth,
        width: data.width,
        fit: 'inside',
      })
      .toFormat('webp', { quality: data.quality })
      .withMetadata()
      .toBuffer();

  toWebp = (imageBuffer: Buffer, quality: number): Promise<Buffer> =>
    sharp(imageBuffer).toFormat('webp', { quality }).withMetadata().toBuffer();

  getImageDimensions = async (
    imageBuffer: Buffer
  ): Promise<{ width: number; height: number }> => {
    const fileMetadata = await sharp(imageBuffer).metadata();
    if (!fileMetadata.height || !fileMetadata.width)
      throw new Error(`Não foi possível encontrar o tamanho da imagem`);
    return { width: fileMetadata.width, height: fileMetadata.height };
  };
}
