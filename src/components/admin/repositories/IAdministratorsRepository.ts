import { Administrator } from '../Administrator';
import { ICreateAdministratorDTO } from '../useCases/CreateAdministratorUseCase/ICreateAdministratorDTO';
import { IListAdministratorFilterDTO } from '../useCases/ListAdministratorsUseCase/IListAdministratorDTO';
import { IUpdateAdministratorPasswordDTO } from '../useCases/UpdateAdministratorPasswordUseCase/IUpdateAdministratorPasswordDTO';
import { IUpdateAdministratorDTO } from '../useCases/UpdateAdministratorUseCase/IUpdateAdministratorDTO';

export interface IAdministratorsRepository {
  saveAdmin(
    data: ICreateAdministratorDTO,
    createdAt: Date
  ): Promise<Administrator>;
  listAdmins(data: IListAdministratorFilterDTO): Promise<Administrator[]>;
  updateAdmin(
    data: IUpdateAdministratorDTO,
    updatedAt: Date
  ): Promise<Administrator>;
  updateAdminPassword(
    data: Pick<IUpdateAdministratorPasswordDTO, 'id' | 'password'>,
    updatedAt: Date
  ): Promise<Administrator>;
  deleteAdmin(id: number, deletedAt: Date): Promise<Administrator>;
  restoreAdmin(id: number): Promise<Administrator>;
}
