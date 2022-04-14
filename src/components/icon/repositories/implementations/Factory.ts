import { IListIconsFilterDTO } from '../../useCases/ListIconsUseCase/IListIconDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListIconsQuery(data: IListIconsFilterDTO): BuildQuery {
  const values: unknown[] = [];
  let query = `
  SELECT
  "id",
  "name",
  "file_type" AS "fileType",
  "relative_path" AS "relativePath",
  "size_in_bytes" AS "sizeInBytes",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt"
FROM "icons"
WHERE 1=1
  `;

  if (data.id) {
    values.push(data.id);
    query += `\n AND "id" = $${values.length}`;
  }

  query += ';';

  return { query, values };
}
