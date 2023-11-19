import { EventEmitter, Injectable, Output, Pipe } from '@angular/core';
import { of, Observable, BehaviorSubject, tap, mergeMap, map } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Product } from '../interfaces/productForKana.interface';
import { Data, Edge } from '../interfaces/kana-service.interface';

@Injectable({
  providedIn: 'root',
})
export class KanaService {
  // TODO: como le doy un dato especifico a cada uno
  // TODO:necesito hacer un nuevo objecto solo con las propiedades a usar

  // arreglo que guarda los pdoructos buscados

  public lastSearchedProducts: Product[] = [];

  // lista de productos temporales
  public products: Product[] = [];

  // productos traidos de kana directamente

  public productsKana = new BehaviorSubject<any>('sin datos');

  public productFound = new BehaviorSubject<any>("0")


  constructor() {


    this.getListProductFromKana$()
      .pipe(tap(() => console.log('products', this.products)))
      .subscribe();

    this.productsKana
      // .pipe(tap((products: any) => console.log('products en el behavior', products)))
      .subscribe();
  }

  getQuery(query: string) {
    const url = 'https://kana.develop.cecosesola.imolko.net/graphql';
    const dataQuery = {
      operationName: null,
      variables: {},
    };
    const payload = {
      ...dataQuery,
      query,
    };
    const option = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({ 'content-type': 'application/json' }),
    };

    const data$ = fromFetch(url, option).pipe(mergeMap((resp: any) => resp.json()));

    return data$;
  }

  getListProductFromKana$(limit: number = 5) {
    const query = `
    query {
      currentPriceList{
        products(first:${limit} ){
          edges{
            node{
              product{
                id
                barcode
                name
                images
                presentation
                departments {
                  description
                }
                pricePublished{
                  priceBase {
                    amount
                  }
                }
              }
            }
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    }`;

    const data$ = this.getQuery(query).pipe(
      tap((data:any) => console.log('data', data)),
      map(
        ({
          data: {
            currentPriceList: {
              products: { edges },
            },
          },
        }) => {
          edges.map((edge:Edge) => {
            let productsKana:Product = edge.node.product;
            this.products.push(productsKana);
            this.productsKana.next(this.products);
          });
        }
      )
    );
    return data$;


  }

  searchProduct(barcode: string): any {

    let foundProduct:Product[] = this.products.filter(products => products.barcode === barcode);
    console.log("foundProduct",foundProduct);


    this.productFound.next(foundProduct[0]);

    return foundProduct;
  }
}
