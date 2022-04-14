UPDATE "users"
SET "updated_at" = ${updatedAt},
"name" = ${name},
"phone" = ${phone},
"address_zip_code" = ${addressZipCode},
"address_city" = ${addressCity},
"address_state" = ${addressState},
"address_country" = ${addressCountry},
"address_coordinates" = ${addressCoordinates}
WHERE "id" = ${id}
RETURNING
  "id",
  "name",
  "phone",
  "address_zip_code" AS "addressZipCode",
  "address_city" AS "addressCity",
  "address_state" AS "addressState",
  "address_country" AS "addressCountry",
  ST_ASGEOJSON("address_coordinates") AS "addressCoordinates",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt";
