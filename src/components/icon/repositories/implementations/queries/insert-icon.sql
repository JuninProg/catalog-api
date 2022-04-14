INSERT INTO "icons"
(
  "name",
  "file_type",
  "relative_path",
  "size_in_bytes",
  "created_at"
)
VALUES
(
  ${name},
  ${fileType},
  ${relativePath},
  ${sizeInBytes},
  ${createdAt}
)
RETURNING
  "id",
  "name",
  "file_type" AS "fileType",
  "relative_path" AS "relativePath",
  "size_in_bytes" AS "sizeInBytes",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
