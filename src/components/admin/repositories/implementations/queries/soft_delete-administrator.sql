UPDATE "administrators"
SET "deleted_at" = ${deletedAt}
WHERE "id" = ${id}
RETURNING
  "id",
  "is_master" AS "isMaster",
  "name",
  "phone",
  "email",
  "password",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
