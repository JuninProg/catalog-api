INSERT INTO "categories_ads_addresses"
(
  "category_ad_id",
  "zip_code",
  "city",
  "state",
  "country",
  "coordinates",
  "street",
  "complement",
  "number",
  "neighborhood",
  "created_at"
)
VALUES
(
  ${categoryAdId},
  ${zipCode},
  ${city},
  ${state},
  ${country},
  ${coordinates},
  ${street},
  ${complement},
  ${number},
  ${neighborhood},
  ${createdAt}
)
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "zip_code" AS "zipCode",
  "city",
  "state",
  "country",
  "neighborhood",
  ST_ASGEOJSON("coordinates") AS "coordinates",
  "street",
  "complement",
  "number",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
