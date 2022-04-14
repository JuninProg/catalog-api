SELECT
  "id",
  "category_id" AS "categoryId",
  "customer_id" AS "customerId",
  "name",
  "description",
  "facebook",
  "instagram",
  "website",
  "email",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt"
FROM "categories_ads"
WHERE "id" = ${id};
