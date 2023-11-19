
export interface Product {
  barcode: string;
  id?:             string;
  name?:           string;
  images?:         string[];
  presentation?:   string;
  departments?:    Department[];
  pricePublished?: PricePublished;
}

export interface Department {
  description: string;
}

export interface PricePublished {
  priceBase: PriceBase;
}

export interface PriceBase {
  amount: string;
}
