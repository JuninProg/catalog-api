import { IListUsersFilterDTO } from '../../useCases/ListUsersUseCase/IListUsersDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListUsersQuery(data: IListUsersFilterDTO): BuildQuery {
  const values: unknown[] = [data.lastIndex];
  let query = `
  SELECT
    "id",
    "name",
    "phone",
    "address_zip_code" AS "addressZipCode",
    "address_city" AS "addressCity",
    "address_state" AS "addressState",
    "address_country" AS "addressCountry",
    ST_ASGEOJSON("address_coordinates") AS "addressCoordinates",
    "created_at" AS "createdAt",
    "updated_at" AS "updatedAt"
  FROM "users"
  WHERE "id" > $1
  `;

  if (data.phone) {
    values.push(data.phone);
    query += `\n AND "phone" = $${values.length}`;
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
