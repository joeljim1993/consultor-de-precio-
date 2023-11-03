import { Injectable, Pipe } from '@angular/core';
import { mergeMap, of,  Observable, map, tap } from 'rxjs';
import { fromFetch } from "rxjs/fetch";

@Injectable({
  providedIn: 'root',
})
export class KanaServiceService {

  constructor(){

    this.getListProductFromKana$()
      .pipe(
        tap((response) => console.log("ESTE ES EL LOG DEL SERVICIO",response)
      ))
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
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({ "content-type": "application/json" }),
    };

    const data$ = fromFetch(url, option)
    .pipe(
      mergeMap( resp => resp.json()
      )
    );

    return data$;
  }


  getListProductFromKana$() {
    const data$ = this.getQuery(this.query)
    .pipe(
      map(
        ({data: {currentPriceList: {products: { edges },}, },}) =>
          edges.map(( edge: any ) => edge.node.product)
      ),
    )
    return data$;
}






  query = `
      query {
        currentPriceList{
          products{
            edges{
              node{
                product{
                  id
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




}
