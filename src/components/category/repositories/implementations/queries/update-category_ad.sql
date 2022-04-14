UPDATE "categories_ads"
SET "updated_at" = ${updatedAt},
"name" = ${name},
"description" = ${description},
"facebook" = ${facebook},
"instagram" = ${instagram},
"website" = ${website},
"email" = ${email}
WHERE "id" = ${id}
RETURNING
  "id",
  "category_id" AS "categoryId",
  "customer_id" AS "customerId",
  "name",
  "description",
  "facebook",
  "instagram",
  "website",
  "email",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt",
  "deleted_at" AS "deletedAt";
