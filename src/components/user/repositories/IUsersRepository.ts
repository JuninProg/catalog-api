import { ICreateUserDTO } from '../useCases/CreateUserUseCase/ICreateUserDTO';
import { IListUsersFilterDTO } from '../useCases/ListUsersUseCase/IListUsersDTO';
import { IUpdateUserDTO } from '../useCases/UpdateUserUseCase/IUpdateUserDTO';
import { User } from '../User';

export interface IUsersRepository {
  saveUser(data: ICreateUserDTO, createdAt: Date): Promise<User>;
  listUsers(data: IListUsersFilterDTO): Promise<User[]>;
  updateUser(data: IUpdateUserDTO, updatedAt: Date): Promise<User>;
}
