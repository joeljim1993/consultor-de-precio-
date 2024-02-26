import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/kana-service.interface';
import { KanaService } from 'src/app/services/kana-service.service';
import { PricePublished } from '../../interfaces/productForKana.interface';

@Component({
  selector: 'app-last-searched',
  templateUrl: './last-searched.component.html',
  styleUrls: ['./last-searched.component.css']
})
export class LastSearchedComponent {

  // public latestProductSearches:any;
  public latestProductSearches:any=[
    {
    name:"Mantequilla Clarificada",
    images:["https://stockimages.tiendasd1.com/stockimages.tiendasd1.com/kobastockimages/IMAGENES/12003657.png"],
    pricePublished:1.45,
    priceBolivar:30.45
  },
  {
    name:"jugo natulac",
    images:["http://kana.develop.cecosesola.imolko.net/web/aws-space/assets/images/migration/products/prd-538-1.png"],
    pricePublished:0.45,
    priceBolivar:30.45
  },
  {
    name:"aceitunas giralda",
    images:["https://superfreshmarket.com.ve/wp-content/uploads/2021/02/aceitunas-enteras-la-giralda-200gr-Fresh.jpg"],
    pricePublished:1.45,
    priceBolivar:30.45
  }
  ]


  // variable de prueba para css
  public products:any;

  constructor( private kanaservice:KanaService){
    this.kanaservice.lastSearchedProducts$.pipe(

      // tap(info => console.log("lo que llega a lastSearchedProducts$",info)),
      // tap(lastedProduct => this.latestProductSearches = lastedProduct ),
      tap( ()=>console.log("ultimos productos en latestProductSearches.... ",this.latestProductSearches)
         )
    )
    .subscribe();

    this.products = this.kanaservice.listProducts

  }








}
