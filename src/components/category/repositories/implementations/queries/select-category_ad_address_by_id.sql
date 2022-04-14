SELECT
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
  "deleted_at" AS "deletedAt"
FROM "categories_ads_addresses"
WHERE "id" = ${id};
