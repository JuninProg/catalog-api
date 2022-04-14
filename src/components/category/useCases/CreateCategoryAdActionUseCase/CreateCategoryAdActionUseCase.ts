import { HttpError, HttpStatusCodes } from '../../../../errors/HttpError';
import { IDateManagerProvider } from '../../../../providers/IDateManagerProvider';
import { IUsersRepository } from '../../../user/repositories/IUsersRepository';
import { CategoryAdAction } from '../../Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryAdActionDTO } from './ICreateCategoryAdActionDTO';

export class CreateCategoryAdActionUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private usersRepository: IUsersRepository,
    private dateManagerProvider: IDateManagerProvider
  ) {}

  execute = async (
    data: ICreateCategoryAdActionDTO
  ): Promise<CategoryAdAction> => {
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

    if (data.userId) {
      const [userFound] = await this.usersRepository.listUsers({
        lastIndex: 0,
        id: data.userId,
      });

      if (!userFound)
        throw new HttpError(
          `Usuário não encontrado pelo id: ${data.userId}`,
          HttpStatusCodes['Not Found']
        );
    }

    return this.categoriesRepository.saveCategoryAdAction(
      data,
      this.dateManagerProvider.getNewDate()
    );
  };
}
