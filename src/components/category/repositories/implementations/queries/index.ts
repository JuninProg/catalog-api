import { resolve } from 'path';
import { sqlFile } from '../../../../../config/database';

export const insertCategoryQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category.sql'
  )
);

export const updateCategoryQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category.sql'
  )
);

export const selectCategoryByIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/select-category_by_id.sql'
  )
);

export const softDeleteCategoryQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/soft_delete-category.sql'
  )
);

export const restoreCategoryQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/restore-category.sql'
  )
);

export const insertCategoryAdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category_ad.sql'
  )
);

export const countSubcategoriesQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/count-subcategories.sql'
  )
);

export const selectCategoryAdByIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/select-category_ad_by_id.sql'
  )
);

export const updateCategoryAdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category_ad.sql'
  )
);

export const softDeleteCategoryAdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/soft_delete-category_ad.sql'
  )
);

export const restoreCategoryAdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/restore-category_ad.sql'
  )
);

export const insertCategoryAdPhoneQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category_ad_phone.sql'
  )
);

export const selectCategoryAdPhoneByIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/select-category_ad_phone_by_id.sql'
  )
);

export const softDeleteCategoryAdPhoneQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/soft_delete-category_ad_phone.sql'
  )
);

export const insertCategoryAdAddressQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category_ad_address.sql'
  )
);

export const selectCategoryAdAddressByIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/select-category_ad_address_by_id.sql'
  )
);

export const softDeleteCategoryAdAddressQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/soft_delete-category_ad_address.sql'
  )
);

export const countCategoriesByAddressIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/count-categories_by_address_id.sql'
  )
);

export const countCategoriesByIconIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/count-categories_by_icon_id.sql'
  )
);

export const updateCategoryAdAddressQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category_ad_address.sql'
  )
);

export const updateCategoryAdPhoneQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category_ad_phone.sql'
  )
);

export const insertCategoryAdFileQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category_ad_file.sql'
  )
);

export const selectCategoryAdFileByIdQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/select-category_ad_file_by_id.sql'
  )
);

export const updateCategoryAdFileQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category_ad_file.sql'
  )
);

export const softDeleteCategoryAdFileQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/soft_delete-category_ad_file.sql'
  )
);

export const insertCategoryAdActionQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/insert-category_ad_action.sql'
  )
);

export const updateCategoryAdActionQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/update-category_ad_action.sql'
  )
);

export const countCategoriesAdsQuery = sqlFile(
  resolve(
    './src/components/category/repositories/implementations/queries/count-categories_ads.sql'
  )
);
