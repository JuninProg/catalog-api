import { Icon } from '../../Icon';
import { ICreateIconRequestDTO } from './ICreateIconDTO';
import { readFile } from 'fs/promises';
import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IPhotoshopProvider } from '../../../../providers/IPhotoshopProvider';
import { IFileUploaderProvider } from '../../../../providers/IFileUploaderProvider';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IIconsRepository } from '../../repositories/IIconsRepository';
import { IDecodedAdmin } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';

export class CreateIconUseCase {
  constructor(
    private photoshopProvider: IPhotoshopProvider,
    private fileUploaderProvider: IFileUploaderProvider,
    private dateManagerProvider: IDateManagerProvider,
    private iconsRepository: IIconsRepository
  ) {}

  execute = async (
    data: ICreateIconRequestDTO,
    admin: IDecodedAdmin | null
  ): Promise<Icon> => {
    if (!admin)
      throw new HttpError(
        `Somente administradores podem criar ícones`,
        HttpStatusCodes.Unauthorized
      );

    const IMAGE_INITIAL_MIMETYPE = 'image/';

    if (!data.fileType.startsWith(IMAGE_INITIAL_MIMETYPE))
      throw new HttpError(
        `Ícones só podem ser imagens`,
        HttpStatusCodes['Unsupported Media Type']
      );

    const fileBuffer = await readFile(data.temporaryPath);

    const ICON_WIDTH = 64;
    const ICON_HEIGTH = 64;
    const ICON_QUALITY = 100;

    const optimizedImageBuffer = await this.photoshopProvider.resizeToWebp({
      imageBuffer: fileBuffer,
      heigth: ICON_HEIGTH,
      width: ICON_WIDTH,
      quality: ICON_QUALITY,
    });

    const DIR_PATH = 'icon';
    const ICON_EXT = 'webp';

    const { fileName } = await this.fileUploaderProvider.saveFile({
      fileBuffer: optimizedImageBuffer,
      dirPath: DIR_PATH,
      fileExt: ICON_EXT,
      mimetype: 'image/webp',
    });

    return this.iconsRepository.saveIcon(
      {
        fileType: 'image/webp',
        name: data.name,
        relativePath: `${DIR_PATH}/${fileName}`,
        sizeInBytes: Buffer.byteLength(optimizedImageBuffer),
      },
      this.dateManagerProvider.getNewDate()
    );
  };
}
