UPDATE "categories"
SET "deleted_at" = NULL
WHERE "id" = ${id}
RETURNING
  "id",
  "name",
  "category_id" AS "categoryId",
  "icon_id" AS "iconId",
  "address_id" AS "addressId",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
