// To parse this data:
//
//   import { Convert, KanaResponse } from "./file";
//
//   const kanaResponse = Convert.toKanaResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface KanaResponse {
  node: Node;
}

export interface Node {
  product: Product;
}

export interface Product {
  id:             string;
  barcode:        string;
  name:           string;
  images:         string[];
  presentation:   string;
  departments:    Department[];
  pricePublished: PricePublished;
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

