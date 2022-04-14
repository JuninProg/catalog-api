INSERT INTO "categories_ads_files"
(
  "category_ad_id",
  "type",
  "file_type",
  "relative_path",
  "size_in_bytes",
  "width",
  "height",
  "created_at"
)
VALUES
(
  ${categoryAdId},
  ${type},
  ${fileType},
  ${relativePath},
  ${sizeInBytes},
  ${width},
  ${height},
  ${createdAt}
)
RETURNING
  "id",
  "category_ad_id" AS "categoryAdId",
  "type",
  "file_type" AS "fileType",
  "relative_path" AS "relativePath",
  "size_in_bytes" AS "sizeInBytes",
  "width",
  "height",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
