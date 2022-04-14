import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertAdministratorQuery = sqlFile(
  resolve(
    './src/components/admin/repositories/implementations/queries/insert-administrator.sql'
  )
);

export const updateAdministratorQuery = sqlFile(
  resolve(
    './src/components/admin/repositories/implementations/queries/update-administrator.sql'
  )
);

export const updateAdministratorPasswordQuery = sqlFile(
  resolve(
    './src/components/admin/repositories/implementations/queries/update-administrator_password.sql'
  )
);

export const softDeleteAdministratorQuery = sqlFile(
  resolve(
    './src/components/admin/repositories/implementations/queries/soft_delete-administrator.sql'
  )
);

export const restoreAdministratorQuery = sqlFile(
  resolve(
    './src/components/admin/repositories/implementations/queries/restore-administrator.sql'
  )
);
