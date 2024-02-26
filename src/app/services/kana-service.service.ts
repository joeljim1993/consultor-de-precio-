import { EventEmitter, Injectable, Output, Pipe } from '@angular/core';
import { of, Observable, BehaviorSubject, tap, mergeMap, map } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Product } from '../interfaces/productForKana.interface';
import { Data, Edge, CurrentPriceList } from '../interfaces/kana-service.interface';
import { Response} from '../interfaces/dollar-value.interface'
@Injectable({
  providedIn: 'root',
})
export class KanaService {




  // arreglo que guarda los pdoructos buscados
  public lastSearchedProducts: Product[] = [];

  // lista de productos temporales
  public listProducts: Product[] = [];

  // productos traidos de kana directamente
  public productsKana = new BehaviorSubject<any>('sin datos');
  // producto resultado de la busqueda
  public productFound$ = new BehaviorSubject<any>("0")

  public lastSearchedProducts$ = new BehaviorSubject<any>("sin productos ")

  public priceDivisa$= new BehaviorSubject<number>(0)

  constructor() {


    this.getListProductFromKana$()
      .pipe(tap(() => console.log('products', this.listProducts)))
      .subscribe();

    this.productsKana
      .pipe(tap((products: any) => console.log('products en el behavior', products)))
      .subscribe();

      this.getDolarValue$()
      .pipe(
        tap( price => this.priceDivisa$.next(price) ),

      )
      .subscribe()



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

  getListProductFromKana$(limit: number = 1000):Observable<void> {
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
            this.listProducts.push(productsKana);
            this.productsKana.next(this.listProducts);
          });
        }
      )
    );
    return data$;


  }

  searchProduct(barcode: string): Product[] {

   let foundProduct:Product[] = this.listProducts.filter(products => products.barcode === barcode);
    // console.log("foundProduct",foundProduct);
    this.productFound$.next(foundProduct[0]);
    this.verifyLastSearched( foundProduct[0] );

    return foundProduct;
  }

  verifyLastSearched(searchedProduct:Product):void{

    if( searchedProduct == undefined) return ;

    let indexProduct = this.lastSearchedProducts.findIndex(product => product.id === searchedProduct.id );
    if( indexProduct !== -1 ){
      // si el producto existe , lo elimina
      this.lastSearchedProducts.splice(indexProduct,1 );
      // el producto se agrega a la lista de ultimos buscados
      this.lastSearchedProducts.push( searchedProduct );
      this.lastSearchedProducts$.next( this.lastSearchedProducts  );
      return;
    }
    this.lastSearchedProducts.push( searchedProduct );
    this.lastSearchedProducts$.next( this.lastSearchedProducts  );
    console.log(" this.lastSearchedProducts en el servicio",this.lastSearchedProducts);

  }

  getDolarValue$(): Observable<number> {
    const query = `
      query{
        currentPriceList{
          officialRate{
            forSales{
              value
            }
          }
        }
      }`;

    const data$: Observable<number> = this.getQuery(query).pipe(
      map((response: any) => {
        const {
          data: {
            currentPriceList: {
              officialRate: { forSales },
            },
          },
        } = response;
        return forSales[1].value;
      }),

    );

    return data$;
  }


}


/*

7598001001018

7592498220457

5852868201212

3800121400348

*/
