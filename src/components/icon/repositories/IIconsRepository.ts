import { Icon } from '../Icon';
import { ICreateIconDTO } from '../useCases/CreateIconUseCase/ICreateIconDTO';
import { IListIconsFilterDTO } from '../useCases/ListIconsUseCase/IListIconDTO';

export interface IIconsRepository {
  saveIcon(data: ICreateIconDTO, createdAt: Date): Promise<Icon>;
  listIcons(data: IListIconsFilterDTO): Promise<Icon[]>;
  deleteIcon(id: number, deletedAt: Date): Promise<Icon>;
}
