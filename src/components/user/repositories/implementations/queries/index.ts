import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertUserQuery = sqlFile(
  resolve(
    './src/components/user/repositories/implementations/queries/insert-user.sql'
  )
);

export const updateUserQuery = sqlFile(
  resolve(
    './src/components/user/repositories/implementations/queries/update-user.sql'
  )
);
