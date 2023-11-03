export interface Image {
 src:string;
 alt:string;

}

export interface Product {
  img:Image;
  name:string;
  priceVED:number;
  priceUSD:number;
}
