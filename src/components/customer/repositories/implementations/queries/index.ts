import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertCustomerQuery = sqlFile(
  resolve(
    './src/components/customer/repositories/implementations/queries/insert-customer.sql'
  )
);

export const updateCustomerQuery = sqlFile(
  resolve(
    './src/components/customer/repositories/implementations/queries/update-customer.sql'
  )
);

export const updateCustomerPasswordQuery = sqlFile(
  resolve(
    './src/components/customer/repositories/implementations/queries/update-customer_password.sql'
  )
);

export const softDeleteCustomerQuery = sqlFile(
  resolve(
    './src/components/customer/repositories/implementations/queries/soft_delete-customer.sql'
  )
);

export const restoreCustomerQuery = sqlFile(
  resolve(
    './src/components/customer/repositories/implementations/queries/restore-customer.sql'
  )
);
