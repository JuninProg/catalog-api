import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IFileUploaderProvider } from '../../../../providers/IFileUploaderProvider';
import { IPhotoshopProvider } from '../../../../providers/IPhotoshopProvider';
import {
  IDecodedAdmin,
  IDecodedCustomer,
} from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAdFile } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryAdFileRequestDTO } from './ICreateCategoryAdFileDTO';
import { readFile } from 'fs/promises';

export class CreateCategoryAdFileUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider,
    private photoshopProvider: IPhotoshopProvider,
    private fileUploaderProvider: IFileUploaderProvider
  ) {}

  execute = async (
    data: ICreateCategoryAdFileRequestDTO,
    admin: IDecodedAdmin | null,
    customer: IDecodedCustomer | null
  ): Promise<CategoryAdFile> => {
    if (!admin && !customer)
      throw new HttpError(
        `Você não tem permissão para criar arquivo nos anúncios das categorias`,
        HttpStatusCodes['Unauthorized']
      );

    const IMAGE_INITIAL_MIMETYPE = 'image/';
    const VIDEO_INITIAL_MIMETYPE = 'video/';

    if (
      !data.fileType.startsWith(IMAGE_INITIAL_MIMETYPE) &&
      !data.fileType.startsWith(VIDEO_INITIAL_MIMETYPE)
    )
      throw new HttpError(
        `Arquivos dos anúncios das categorias só podem ser imagens ou vídeos`,
        HttpStatusCodes['Unsupported Media Type']
      );

    const categoryAdFound = await this.categoriesRepository.findCategoryAdById(
      data.categoryAdId
    );

    if (!categoryAdFound)
      throw new HttpError(
        `Anúncio da categoria não encontrado pelo id: ${data.categoryAdId}`,
        HttpStatusCodes['Not Found']
      );

    if (categoryAdFound.deletedAt)
      throw new HttpError(
        `Anúncio da categoria está removido: ${data.categoryAdId}`,
        HttpStatusCodes['Bad Request']
      );

    if (customer && customer.id !== categoryAdFound.customerId)
      throw new HttpError(
        'Você não tem permissão para criar arquivo do anúncio da categoria',
        HttpStatusCodes.Unauthorized
      );

    const fileBuffer = await readFile(data.temporaryPath);

    const DIR_PATH = `category/${categoryAdFound.categoryId}/ad/${categoryAdFound.id}`;

    const isImage = data.fileType.startsWith(IMAGE_INITIAL_MIMETYPE);

    let ext = null;
    let buffer = null;
    let width = null;
    let height = null;
    let fileType = null;

    if (isImage) {
      const fileDimensions = await this.photoshopProvider.getImageDimensions(
        fileBuffer
      );

      const PROPORTIONAL_VALUE = 1000;

      const biggerDimension =
        fileDimensions.width > fileDimensions.height
          ? fileDimensions.width
          : fileDimensions.height;

      const proportion = biggerDimension / PROPORTIONAL_VALUE;

      const imageWidth =
        proportion > 1
          ? Math.round(fileDimensions.width / proportion)
          : fileDimensions.width;
      const imageHeigth =
        proportion > 1
          ? Math.round(fileDimensions.height / proportion)
          : fileDimensions.height;

      const IMAGE_QUALITY = 90;
      const IMAGE_EXT = 'webp';

      const imageBuffer = await this.photoshopProvider.resizeToWebp({
        heigth: imageHeigth,
        imageBuffer: fileBuffer,
        width: imageWidth,
        quality: IMAGE_QUALITY,
      });

      buffer = imageBuffer;
      ext = IMAGE_EXT;
      width = imageWidth;
      height = imageHeigth;
      fileType = 'image/' + IMAGE_EXT;
    } else {
      const VIDEO_EXT = data.fileType.split(VIDEO_INITIAL_MIMETYPE)[1];

      buffer = fileBuffer;
      ext = VIDEO_EXT;
      fileType = 'video/' + VIDEO_EXT;
    }

    const { fileName } = await this.fileUploaderProvider.saveFile({
      dirPath: DIR_PATH,
      fileBuffer: buffer,
      fileExt: ext,
      mimetype: fileType,
    });

    const relativePath = `${DIR_PATH}/${fileName}`;

    return this.categoriesRepository.saveCategoryAdFile(
      {
        categoryAdId: data.categoryAdId,
        type: data.type,
        relativePath,
        sizeInBytes: Buffer.byteLength(buffer),
        fileType,
        height,
        width,
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
