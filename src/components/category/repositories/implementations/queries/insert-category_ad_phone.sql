INSERT INTO "categories_ads_phones"
(
  "category_ad_id",
  "is_whatsapp",
  "phone",
  "created_at"
)
VALUES
(
  ${categoryAdId},
  ${isWhatsapp},
  ${phone},
  ${createdAt}
)
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "is_whatsapp" AS "isWhatsapp",
  "phone" AS "phone",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
