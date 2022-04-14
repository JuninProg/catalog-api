import { IListAddressesFilterDTO } from '../../useCases/ListAddressesUseCase/IListAddressDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListAddressesQuery(
  data: IListAddressesFilterDTO
): BuildQuery {
  const values: unknown[] = [data.lastIndex];
  let query = `
  SELECT
    "id",
    "zip_code" AS "zipCode",
    "city",
    "state",
    "country",
    ST_ASGEOJSON("coordinates") AS "coordinates",
    "created_at" AS "createdAt",
    "updated_at" AS "updatedAt",
    "deleted_at" AS "deletedAt"
  FROM "addresses"
  WHERE "id" > $1
  `;

  if (data.id) {
    values.push(data.id);
    query += `\n AND "id" = $${values.length}`;
  }

  if (data.zipCode) {
    values.push(data.zipCode);
    query += `\n AND "zip_code" = $${values.length}`;
  }

  if (data.limit) {
    values.push(data.limit);
    query += `\n LIMIT $${values.length}`;
  }

  query += ';';

  return { query, values };
}
