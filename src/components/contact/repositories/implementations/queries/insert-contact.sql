INSERT INTO "contacts"
(
  "name",
  "phone",
  "description",
  "created_at"
)
VALUES
(
  ${name},
  ${phone},
  ${description},
  ${createdAt}
)
RETURNING
  "id",
  "name",
  "phone",
  "description",
  "created_at" AS "createdAt";
