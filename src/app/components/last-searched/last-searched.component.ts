import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/kana-service.interface';
import { KanaService } from 'src/app/services/kana-service.service';

@Component({
  selector: 'app-last-searched',
  templateUrl: './last-searched.component.html',
  styleUrls: ['./last-searched.component.css']
})
export class LastSearchedComponent {

  public latestProductSearches:Product[] | undefined;

  constructor( private kanaservice:KanaService){
    this.kanaservice.lastSearchedProducts$.pipe(
      tap(listProduct => listProduct = this.latestProductSearches),
      tap(()=> console.log("lasted", this.latestProductSearches))
    )
    .subscribe();

  }








}
