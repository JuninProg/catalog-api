import { IDateManagerProvider } from '../IDateManagerProvider';

export class DateManager implements IDateManagerProvider {
  getNewDate = (): Date => new Date();
}
