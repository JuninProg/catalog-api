UPDATE "addresses"
SET "updated_at" = ${updatedAt},
"zip_code" = ${zipCode},
"city" = ${city},
"state" = ${state},
"country" = ${country},
"coordinates" = ${coordinates}
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
