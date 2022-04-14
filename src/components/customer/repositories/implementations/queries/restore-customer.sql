UPDATE "customers"
SET "deleted_at" = NULL
WHERE "id" = ${id}
RETURNING
  "id",
  "name",
  "phone",
  "email",
  "password",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
