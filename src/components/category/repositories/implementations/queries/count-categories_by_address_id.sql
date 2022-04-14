SELECT COUNT("id") AS "totalOfCategories"
FROM "categories"
WHERE "address_id" = ${addressId};
