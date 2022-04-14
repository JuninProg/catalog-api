INSERT INTO "administrators"
(
  "is_master",
  "name",
  "phone",
  "email",
  "password",
  "created_at"
)
VALUES
(
  ${isMaster},
  ${name},
  ${phone},
  ${email},
  ${password},
  ${createdAt}
)
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
