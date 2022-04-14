export interface ITokenProvider {
  signToken(data: Record<string, unknown>, expiresIn?: number): Promise<string>;
  decodeToken(token: string): Promise<any>;
}
