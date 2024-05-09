import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/kana-service.interface';
import { KanaService } from 'src/app/services/kana-service.service';

@Component({
  selector: 'app-last-searched',
  templateUrl: './last-searched.component.html',
  styleUrls: ['./last-searched.component.css']
})
export class LastSearchedComponent {

  public latestProductSearches:any =[];

  public dollarValue: number = 0;

  private kanaservice= inject( KanaService );

  constructor() {

    this.kanaservice.lastSearchedProducts$.pipe(
      tap(lastedProduct => this.latestProductSearches = lastedProduct),

    )
      .subscribe();

    this.kanaservice.priceDivisa$.pipe(
      tap(priceDivisa => this.dollarValue = priceDivisa )
    ).subscribe();

  }








}
