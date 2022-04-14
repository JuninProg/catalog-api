import { Icon } from '../../Icon';

export interface IListIconsFilterDTO {
  id?: number;
}

export interface IListIconDTO extends Icon {
  link: string;
}
