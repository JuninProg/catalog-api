SELECT COUNT("id") AS "totalOfSubcategories"
FROM "categories"
WHERE "category_id" = ${categoryId};
