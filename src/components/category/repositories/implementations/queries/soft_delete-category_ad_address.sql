UPDATE "categories_ads_addresses"
SET "deleted_at" = ${deletedAt}
WHERE "id" = ${id}
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
