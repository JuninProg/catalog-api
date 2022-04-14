export interface IHashProvider {
  genHash(value: string): Promise<string>;
  compareHash(hash: string, value: string): Promise<boolean>;
}
