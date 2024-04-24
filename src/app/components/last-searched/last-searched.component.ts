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

  public latestProductSearches: any;

  public dollarValue: number = 0;



  constructor(private kanaservice: KanaService) {

    this.kanaservice.lastSearchedProducts$.pipe(

      tap(info => console.log("lo que llega a lastSearchedProducts$", info)),
      tap(lastedProduct => this.latestProductSearches = lastedProduct),

    )
      .subscribe();

    this.kanaservice.priceDivisa$.pipe(
      tap(priceDivisa => this.dollarValue = priceDivisa )
    ).subscribe();

  }








}
