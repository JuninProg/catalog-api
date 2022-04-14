import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IDecodedUser } from '../../../auth/useCases/TokenAuthUseCase/ITokenAuthDTO';
import { CategoryAdAction } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { IUpdateCategoriesAdsActionsDTO } from './IUpdateCategoriesAdsActionsDTO';

export class UpdateCategoriesAdsActionsUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: IUpdateCategoriesAdsActionsDTO,
    user: IDecodedUser | null
  ): Promise<CategoryAdAction[]> => {
    if (!user)
      throw new HttpError(
        'Você não tem permissão para atualizar as ações dos anúncios das categorias',
        HttpStatusCodes['Unauthorized']
      );

    const actionsFound =
      await this.categoriesRepository.listCategoriesAdsActions({
        uuid: data.uuid,
      });

    const ids = actionsFound.map((actionFound) => actionFound.id);

    return this.categoriesRepository.updateCategoriesAdsActions(
      ids,
      user.id,
      this.dateManagerProvider.getNewDate()
    );
  };
}
