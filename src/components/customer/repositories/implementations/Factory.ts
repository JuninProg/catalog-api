import { IListCustomersFilterDTO } from '../../useCases/ListCustomersUseCase/IListCustomersDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListCustomersQuery(
  data: IListCustomersFilterDTO
): BuildQuery {
  const values: unknown[] = [data.lastIndex];
  let query = `
  SELECT
    "id",
    "name",
    "phone",
    "email",
    "password",
    "created_at" AS "createdAt",
    "updated_at" AS "updatedAt",
    "deleted_at" AS "deletedAt"
  FROM "customers"
  WHERE "id" > $1
  `;

  if (data.email) {
    values.push(data.email);
    query += `\n AND "email" = $${values.length}`;
  }

  if (data.id) {
    values.push(data.id);
    query += `\n AND "id" = $${values.length}`;
  }

  if (data.limit) {
    values.push(data.limit);
    query += `\n LIMIT $${values.length}`;
  }

  query += ';';

  return { query, values };
}
