UPDATE "categories_ads_phones"
SET "deleted_at" = ${deletedAt}
WHERE "id" = ${id}
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "is_whatsapp" AS "isWhatsapp",
  "phone",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
