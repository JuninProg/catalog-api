import { IPhoneProvider } from '../IPhoneProvider';
const telefone = require('telefone/parse');

export class Phone implements IPhoneProvider {
  parsePhone = (phone: string): string | null => {
    return telefone(phone);
  };
}
