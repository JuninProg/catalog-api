import { IListAdministratorFilterDTO } from '../../useCases/ListAdministratorsUseCase/IListAdministratorDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListAdminsQuery(
  data: IListAdministratorFilterDTO
): BuildQuery {
  const values: unknown[] = [data.lastIndex];
  let query = `
  SELECT
    "id",
    "is_master" AS "isMaster",
    "name",
    "phone",
    "email",
    "password",
    "created_at" AS "createdAt",
    "updated_at" AS "updatedAt",
    "deleted_at" AS "deletedAt"
  FROM "administrators"
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
