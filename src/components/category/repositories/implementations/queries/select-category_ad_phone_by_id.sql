SELECT
  "id",
  "category_ad_id" AS "categoryAdId",
  "is_whatsapp" AS "isWhatsapp",
  "phone",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt"
FROM "categories_ads_phones"
WHERE "id" = ${id};
