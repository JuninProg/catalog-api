INSERT INTO "users"
(
  "name",
  "phone",
  "address_zip_code",
  "address_city",
  "address_state",
  "address_country",
  "address_coordinates",
  "created_at"
)
VALUES
(
  ${name},
  ${phone},
  ${addressZipCode},
  ${addressCity},
  ${addressState},
  ${addressCountry},
  ${addressCoordinates},
  ${createdAt}
)
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
