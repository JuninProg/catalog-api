export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListContactsQuery(): BuildQuery {
  const values: unknown[] = [];
  let query = `
  SELECT
    "id",
    "name",
    "phone",
    "description",
    "created_at" AS "createdAt"
  FROM "contacts"
  ORDER BY "created_at" DESC
  `;

  query += ';';

  return { query, values };
}
