UPDATE "categories_ads"
SET "deleted_at" = NULL
WHERE "id" = ${id}
RETURNING
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
  "deleted_at" AS "deletedAt";
