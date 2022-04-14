UPDATE "categories_ads_phones"
SET "updated_at" = ${updatedAt},
"is_whatsapp" = ${isWhatsapp},
"phone" = ${phone}
WHERE "id" = ${id}
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "is_whatsapp" AS "isWhatsapp",
  "phone" AS "phone",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
