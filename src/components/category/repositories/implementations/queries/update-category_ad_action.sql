UPDATE "categories_ads_actions"
SET "updated_at" = ${updatedAt},
"user_id" = ${userId}
WHERE "id" = ${id}
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "user_id" AS "userId",
  "uuid",
  "type",
  "description",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt";
