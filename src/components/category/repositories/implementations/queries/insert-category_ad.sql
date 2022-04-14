INSERT INTO "categories_ads"
(
  "category_id",
  "customer_id",
  "name",
  "description",
  "facebook",
  "instagram",
  "website",
  "email",
  "created_at"
)
VALUES
(
  ${categoryId},
  ${customerId},
  ${name},
  ${description},
  ${facebook},
  ${instagram},
  ${website},
  ${email},
  ${createdAt}
)
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
