INSERT INTO "customers"
(
  "name",
  "phone",
  "email",
  "password",
  "created_at"
)
VALUES
(
  ${name},
  ${phone},
  ${email},
  ${password},
  ${createdAt}
)
RETURNING
  "id",
  "name",
  "phone",
  "email",
  "password",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
