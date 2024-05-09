import {  Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, tap, mergeMap, map, Subject,asyncScheduler } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Product, DataKana, CurrentPriceList, Products } from '../interfaces/kana-service.interface';
import {  Edge } from '../interfaces/kana-service.interface';

@Injectable({
  providedIn: 'root',
})
export class KanaService {

  // arreglo que guarda los productos buscados
  public lastSearchedProducts: Product[] = [];

  // lista de productos temporales
  public productsList: Product[] = [];

  //TODO:si la lista es null, se deberia mostrar un loading
  public listProductsOfKana    = new BehaviorSubject<Product[]|null>(null);

  // producto resultado de la busqueda
  public productFound$         = new BehaviorSubject<any>("0");
  public lastSearchedProducts$ = new Subject<Product[]>();

  // precio de la divisa del dia
  public priceDivisa$          = new BehaviorSubject<number>(0);

  private currentPriceList$ =new  Subject<CurrentPriceList>();

  private numberList:number|null= null;

  constructor() {

    this.prueba();

    this.getListProductFromKana$()
      .subscribe();

    this.listProductsOfKana
      .subscribe();

      this.getDolarValue$()
      .pipe(
        tap( price => this.priceDivisa$.next(price) ),

      )
      .subscribe();

      this.currentPriceList$
      .pipe(
        map( currentList =>  currentList.version),
        tap( currentListVersion => this.numberList = currentListVersion),
        tap( ()=> console.log("version de la lista ",this.numberList)
         )
      )
      .subscribe();


      this.verifyListProduct$().subscribe();

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

  getListProductFromKana$(limit: number = 1000):Observable<any> {
    const query = `
    query {
      currentPriceList{
        version
          createdAt
          createdBy{
          displayName

          }

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
      tap( ({data:{currentPriceList}})=>{

      this.currentPriceList$.next(currentPriceList);


      }),
      map(
        ({data: {currentPriceList:  {  products: { edges }, },},}) => {
          edges.map((edge:Edge) => {

            let productsKana:Product = edge.node.product;
            this.productsList.push( productsKana );
            this.listProductsOfKana.next( this.productsList );
          });
        }
      )
    );
    return data$;
  }

  searchProduct(barcode: string): Product[] {

    let foundProduct:Product[] = this.productsList.filter(products => products.barcode === barcode);
    this.productFound$.next(foundProduct[0]);
    this.verifyLastSearched( foundProduct[0] );
    return foundProduct;

  }


  verifyLastSearched( searchedProduct:Product):void{

    if( searchedProduct == undefined ) return ;
    // si la lista tiene el mismo producto , lo elimina

    this.deleteProductOfListByIndex( searchedProduct ,this.lastSearchedProducts);
    this.lastSearchedProducts.push( searchedProduct );
    this.lastSearchedProducts$.next( this.lastSearchedProducts  );

  };

  deleteProductOfListByIndex(product:any,listProduct:Product[] ):void{

    let indexProduct = listProduct.findIndex( productOfList => productOfList.id == product.id );
    if( indexProduct !== -1){
    listProduct.splice( indexProduct,1);
     return;
    }

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
  // todo: crear una funcion que verifique la lista , si es distinta , actualiza la lista
  checkPriceList(){

  }

  // todo:hacer la peticion de lista de precio y verificar
  verifyListProduct$():Observable<any> {
    console.log("ejecutando funcion ");

    const query = `
    query {
      currentPriceList{
          version
          createdAt
          createdBy{
          displayName

          }


      }
    }`;

    const data$ = this.getQuery(query).pipe(
      tap((data:any) => console.log('data2222', data)),
      map( ({data:{currentPriceList}})=>  currentPriceList.version  ),
      tap( listVersion  =>{
        if( listVersion == this.numberList )return;
        console.log("se ejecuto la funcion ");

        this.getListProductFromKana$();
      }),



    )
    return data$

  }

prueba(){

const minute:number = 60*1000;
// se puede usar una variable para almacenar el contexto this, ya que puede cambiar dependiendo del ambito
const self = this;
const subs = asyncScheduler.schedule( function(state=0){

  this.schedule( state +1 ,0.3*minute);
  console.log("llamar la funcion actualizar ",new Date);
  self.getListProductFromKana$().subscribe()


},0.3*minute,0);



}


}




7591082000307
2525252525251
7591082000307
7592591000154
