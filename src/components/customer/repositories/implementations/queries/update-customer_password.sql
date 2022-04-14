UPDATE "customers"
SET "updated_at" = ${updatedAt},
"password" = ${password}
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
