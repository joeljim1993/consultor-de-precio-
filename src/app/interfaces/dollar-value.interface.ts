export interface Sales {
  value: number;
}

export interface OfficialRate {
  forSales: Sales[];
}

export interface CurrentPriceList {
  officialRate: OfficialRate;
}

export interface Data {
  currentPriceList: CurrentPriceList;
}

export interface Response {
  data: Data;
}
