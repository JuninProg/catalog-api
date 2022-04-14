UPDATE "addresses"
SET "deleted_at" = ${deletedAt}
WHERE "id" = ${id}
RETURNING
  "id",
  "zip_code" AS "zipCode",
  "city",
  "state",
  "country",
  ST_ASGEOJSON("coordinates") AS "coordinates",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
