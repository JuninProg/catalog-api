import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertAddressQuery = sqlFile(
  resolve(
    './src/components/address/repositories/implementations/queries/insert-address.sql'
  )
);

export const updateAddressQuery = sqlFile(
  resolve(
    './src/components/address/repositories/implementations/queries/update-address.sql'
  )
);

export const restoreAddressQuery = sqlFile(
  resolve(
    './src/components/address/repositories/implementations/queries/restore-address.sql'
  )
);

export const softDeleteAddressQuery = sqlFile(
  resolve(
    './src/components/address/repositories/implementations/queries/soft_delete-address.sql'
  )
);
