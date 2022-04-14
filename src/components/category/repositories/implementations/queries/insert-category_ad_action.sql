INSERT INTO "categories_ads_actions"
(
  "category_ad_id",
  "user_id",
  "uuid",
  "type",
  "description",
  "created_at"
)
VALUES
(
  ${categoryAdId},
  ${userId},
  ${uuid},
  ${type},
  ${description},
  ${createdAt}
)
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "user_id" AS "userId",
  "uuid",
  "type",
  "description",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt";
