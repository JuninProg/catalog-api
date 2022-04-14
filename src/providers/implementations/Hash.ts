import { IHashProvider } from '../IHashProvider';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class Hash implements IHashProvider {
  genHash = (value: string): Promise<string> => bcrypt.hash(value, SALT_ROUNDS);

  compareHash = (hash: string, value: string): Promise<boolean> =>
    bcrypt.compare(value, hash);
}
