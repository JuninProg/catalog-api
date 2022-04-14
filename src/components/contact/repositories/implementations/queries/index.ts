import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertContactQuery = sqlFile(
  resolve(
    './src/components/contact/repositories/implementations/queries/insert-contact.sql'
  )
);
