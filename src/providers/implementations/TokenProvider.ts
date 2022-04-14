import { ITokenProvider } from '../ITokenProvider';
import jsonwebtoken from 'jsonwebtoken';

const DEFAULT_JWT_SECRET = '1234';
const JWT_ALGORITHM = 'HS256';
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || DEFAULT_JWT_SECRET;

export class TokenProvider implements ITokenProvider {
  signToken = (
    data: Record<string, unknown>,
    expiresIn?: number
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const options: jsonwebtoken.SignOptions = {
        algorithm: JWT_ALGORITHM,
      };

      if (expiresIn) options.expiresIn = `${expiresIn}ms`;

      jsonwebtoken.sign(data, JWT_TOKEN_SECRET, options, (err, encoded) => {
        if (err) reject(err);
        resolve(encoded as string);
      });
    });

  decodeToken = (token: string): Promise<any> =>
    new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        token,
        JWT_TOKEN_SECRET,
        { algorithms: [JWT_ALGORITHM] },
        (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        }
      );
    });
}
