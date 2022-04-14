import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertIconQuery = sqlFile(
  resolve(
    './src/components/icon/repositories/implementations/queries/insert-icon.sql'
  )
);

export const sofDeleteIconQuery = sqlFile(
  resolve(
    './src/components/icon/repositories/implementations/queries/soft_delete-icon.sql'
  )
);
