export interface IListCategoriesAdsActionsFilterDTO {
  categoryAdId?: number;
  uuid?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export interface IConsultCategoryAdActionsDTO {
  startDate?: string;
  endDate?: string;
  type?: string;
  groupByType?: true;
}
