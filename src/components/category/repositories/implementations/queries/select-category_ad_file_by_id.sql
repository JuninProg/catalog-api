SELECT
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
  "deleted_at" AS "deletedAt"
FROM "categories_ads_files"
WHERE "id" = ${id};
