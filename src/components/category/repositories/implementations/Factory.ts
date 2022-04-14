import { STPoint } from '../../../address/Address';
import { IListCategoriesAdsActionsFilterDTO } from '../../useCases/ConsultCategoryAdActionsUseCase/IConsultCategoryAdActionsDTO';
import { IFindCategoriesAdsFilterDTO } from '../../useCases/FindCategoriesAdsUseCase/IFindCategoriesAdsDTO';
import { IListCategoriesAdsFilterDTO } from '../../useCases/ListCategoriesAdsUseCase/IListCategoryAdDTO';
import { IListCategoriesFilterDTO } from '../../useCases/ListCategoriesUseCase/IListCategoryDTO';

export interface BuildQuery {
  query: string;
  values: unknown[];
}

export function buildListCategoriesQuery(
  data: Pick<IListCategoriesFilterDTO, 'id' | 'nonMain' | 'nonDeleted'>
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT
  "categories"."id",
  "categories"."name",
  "categories"."category_id" AS "categoryId",
  "categories"."address_id" AS "addressId",
  "categories"."icon_id" AS "iconId",
  "categories"."created_at" AS "createdAt",
  "categories"."updated_at" AS "updatedAt",
  "categories"."deleted_at" AS "deletedAt",
  CASE
    WHEN COUNT("categories_ads"."id") > 0 THEN true 
    ELSE false 
  END AS "haveAds",
  "icon"."relative_path" AS "iconRelativePath"
FROM "categories"
  LEFT JOIN "categories_ads"
  ON "categories_ads"."category_id" = "categories"."id"
  LEFT JOIN "icons" AS "icon"
  ON "icon"."id" = "categories"."icon_id"
WHERE 1=1`;

  if (data.id) {
    values.push(data.id);
    query += `\nAND "categories"."id" = $${values.length}`;
  }

  if (data.nonMain) query += '\nAND "categories"."category_id" IS NOT NULL';

  if (data.nonDeleted) query += '\nAND "categories"."deleted_at" IS NULL';

  query += '\nGROUP BY "categories"."id", "icon"."relative_path"';

  return { query, values };
}

export function buildListMainCategoriesQuery(
  data: Pick<
    IListCategoriesFilterDTO,
    'id' | 'lat' | 'long' | 'nonDeleted' | 'page' | 'limit'
  >
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT
  "categories"."id",
  "categories"."name",
  "categories"."category_id" AS "categoryId",
  "categories"."address_id" AS "addressId",
  "categories"."icon_id" AS "iconId",
  "categories"."created_at" AS "createdAt",
  "categories"."updated_at" AS "updatedAt",
  "categories"."deleted_at" AS "deletedAt",
  CASE
    WHEN COUNT("categories_ads"."id") > 0 THEN true 
    ELSE false 
  END AS "haveAds",
  "addresses"."id" AS "addressId",
  "addresses"."zip_code" AS "addressZipCode",
  "addresses"."city" AS "addressCity",
  "addresses"."state" AS "addressState",
  "addresses"."country" AS "addressCountry",
  ST_ASGEOJSON("addresses"."coordinates") AS "addressCoordinates",
  "icon"."relative_path" AS "iconRelativePath"
FROM "categories"
  LEFT JOIN "categories_ads"
  ON "categories_ads"."category_id" = "categories"."id"
  LEFT JOIN "addresses"
  ON "addresses"."id" = "categories"."address_id"
  LEFT JOIN "icons" AS "icon"
  ON "icon"."id" = "categories"."icon_id"
WHERE "categories"."category_id" IS NULL`;

  if (data.id) {
    values.push(data.id);
    query += `\nAND "categories"."id" = $${values.length}`;
  }

  if (data.nonDeleted) query += '\nAND "categories"."deleted_at" IS NULL';

  query += `\nGROUP BY "categories"."id", "addresses"."id", "icon"."relative_path"`;

  if (data.lat && data.long) {
    values.push(
      new STPoint({
        lat: data.lat,
        long: data.long,
      })
    );
    query += `\nORDER BY "addresses"."coordinates" <-> $${values.length}`;
  }

  if (data.page && data.limit) {
    const limitLength = values.push(data.limit);
    values.push(data.page === 1 ? 0 : data.page);
    query += `\nLIMIT $${limitLength} OFFSET $${values.length}`;
  }

  return { query, values };
}

export function buildListCategoriesAdsQuery(
  data: IListCategoriesAdsFilterDTO
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT
  "ad"."id" AS "adId",
  "ad"."category_id" AS "adCategoryId",
  "ad"."customer_id" AS "adCustomerId",
  "ad"."name" AS "adName",
  "ad"."description" AS "adDescription",
  "ad"."facebook" AS "adFacebook",
  "ad"."instagram" AS "adInstagram",
  "ad"."website" AS "adWebsite",
  "ad"."email" AS "adEmail",
  "ad"."created_at" AS "adCreatedAt",
  "ad"."updated_at" AS "adUpdatedAt",
  "ad"."deleted_at" AS "adDeletedAt",
  "adPhone"."id" AS "adPhoneId",
  "adPhone"."category_ad_id" AS "adPhoneCategoryAdId",
  "adPhone"."is_whatsapp" AS "adPhoneIsWhatsapp",
  "adPhone"."phone" AS "adPhonePhone",
  "adPhone"."created_at" AS "adPhoneCreatedAt",
  "adPhone"."updated_at" AS "adPhoneUpdatedAt",
  "adPhone"."deleted_at" AS "adPhoneDeletedAt",
  "adAddress"."id" AS "adAddressId",
  "adAddress"."category_ad_id" AS "adAddressCategoryAdId",
  "adAddress"."zip_code" AS "adAddressZipCode",
  "adAddress"."city" AS "adAddressCity",
  "adAddress"."state" AS "adAddressState",
  "adAddress"."country" AS "adAddressCountry",
  "adAddress"."neighborhood" AS "adAddressNeighborhood",
  ST_ASGEOJSON("adAddress"."coordinates") AS "adAddressCoordinates",
  "adAddress"."street" AS "adAddressStreet",
  "adAddress"."complement" AS "adAddressComplement",
  "adAddress"."number" AS "adAddressNumber",
  "adAddress"."created_at" AS "adAddressCreatedAt",
  "adAddress"."updated_at" AS "adAddressUpdatedAt",
  "adAddress"."deleted_at" AS "adAddressDeletedAt",
  "file"."id" AS "fileId",
  "file"."category_ad_id" AS "fileCategoryAdId",
  "file"."type" AS "fileType",
  "file"."file_type" AS "fileFileType",
  "file"."relative_path" AS "fileRelativePath",
  "file"."size_in_bytes" AS "fileSizeInBytes",
  "file"."width" AS "fileWidth",
  "file"."height" AS "fileHeight",
  "file"."created_at" AS "fileCreatedAt",
  "file"."updated_at" AS "fileUpdatedAt",
  "file"."deleted_at" AS "fileDeletedAt"
FROM "categories_ads" AS "ad"
  LEFT JOIN "categories_ads_phones" AS "adPhone"
  ON "adPhone"."category_ad_id" = "ad"."id"
  LEFT JOIN "categories_ads_addresses" AS "adAddress"
  ON "adAddress"."category_ad_id" = "ad"."id"
  LEFT JOIN "categories_ads_files" AS "file"
  ON "file"."category_ad_id" = "ad"."id" 
WHERE 1=1`;

  if (data.categoryId) {
    values.push(data.categoryId);
    query += `\nAND "ad"."category_id" = $${values.length}`;
  }

  if (data.id) {
    values.push(data.id);
    query += `\nAND "ad"."id" = $${values.length}`;
  }

  if (data.lat && data.long) {
    values.push(
      new STPoint({
        lat: data.lat,
        long: data.long,
      })
    );
    query += `\nORDER BY "adAddress"."coordinates" <-> $${values.length}`;
  }

  return { query, values };
}

export function buildListCategoriesAdsActionsQuery(
  data: IListCategoriesAdsActionsFilterDTO
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT
  "id",
  "category_ad_id" AS "categoryAdId",
  "user_id" AS "userId",
  "uuid",
  "type",
  "description",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt"
FROM "categories_ads_actions" 
WHERE 1=1`;

  if (data.categoryAdId) {
    values.push(data.categoryAdId);
    query += `\nAND "category_ad_id" = $${values.length}`;
  }

  if (data.uuid) {
    values.push(data.uuid);
    query += `\nAND "uuid" = $${values.length}`;
  }

  if (data.type) {
    values.push(data.type);
    query += `\nAND "type" = $${values.length}`;
  }

  if (data.startDate) {
    values.push(data.startDate);
    query += `\nAND "created_at" >= CONCAT($${values.length}, ' 00:00:00+00')::timestamp`;
  }

  if (data.endDate) {
    values.push(data.endDate);
    query += `\nAND "created_at" <= CONCAT($${values.length}, ' 23:59:59+00')::timestamp`;
  }

  return { query, values };
}

export function buildFindCategoriesAdsQuery(
  data: IFindCategoriesAdsFilterDTO
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT
  "ad"."id",
  "ad"."category_id" AS "categoryId",
  "cat"."name" AS "category",
  "ad"."customer_id" AS "customerId",
  "ad"."name",
  "ad"."description",
  "ad"."facebook",
  "ad"."instagram",
  "ad"."website",
  "ad"."email",
  "ad"."created_at" AS "createdAt",
  "ad"."updated_at" AS "updatedAt",
  "ad"."deleted_at" AS "deletedAt"
FROM "categories_ads" AS "ad"
  LEFT JOIN "categories" AS "cat"
  ON "cat"."id" = "ad"."category_id"
  LEFT JOIN "categories_ads_addresses" AS "address"
  ON "address"."category_ad_id" = "ad"."id"
WHERE 1=1`;

  if (data.category) {
    values.push(data.category);
    query += `\nAND to_tsvector('portuguese', "cat"."name") @@ plainto_tsquery('portuguese', $${values.length})`;
  }

  if (data.name) {
    values.push(data.name);
    query += `\nAND to_tsvector('portuguese', "ad"."name") @@ plainto_tsquery('portuguese', $${values.length})`;
  }

  if (data.description) {
    values.push(data.description);
    query += `\nAND to_tsvector('portuguese', "ad"."description") @@ plainto_tsquery('portuguese', $${values.length})`;
  }

  if (data.lat && data.long) {
    values.push(
      new STPoint({
        lat: data.lat,
        long: data.long,
      })
    );
    query += `\nORDER BY "address"."coordinates" <-> $${values.length}`;
  }

  if (data.page && data.limit) {
    const limitLength = values.push(data.limit);
    values.push(data.page === 1 ? 0 : data.page);
    query += `\nLIMIT $${limitLength} OFFSET $${values.length}`;
  }

  return { query, values };
}

export function buildCountMainCategories(
  data: Pick<IListCategoriesFilterDTO, 'nonDeleted'>
): BuildQuery {
  const values: unknown[] = [];
  let query = `
SELECT COUNT("id") AS "totalCategories"
FROM "categories"
WHERE "category_id" IS NULL`;

  if (data.nonDeleted) query += '\nAND "deleted_at" IS NULL';

  return { query, values };
}
