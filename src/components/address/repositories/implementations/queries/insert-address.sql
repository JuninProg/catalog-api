INSERT INTO "addresses"
(
  "zip_code",
  "city",
  "state",
  "country",
  "coordinates",
  "created_at"
)
VALUES
(
  ${zipCode},
  ${city},
  ${state},
  ${country},
  ${coordinates},
  ${createdAt}
)
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
