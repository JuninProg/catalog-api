INSERT INTO "categories"
(
  "name",
  "category_id",
  "icon_id",
  "address_id",
  "created_at"
)
VALUES
(
  ${name},
  ${categoryId},
  ${iconId},
  ${addressId},
  ${createdAt}
)
RETURNING
  "id",
  "name",
  "category_id" AS "categoryId",
  "icon_id" AS "iconId",
  "address_id" AS "addressId",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
