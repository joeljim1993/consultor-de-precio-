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

  public latestProductSearches:any;
  // variable de prueba para css
  public products:any;

  constructor( private kanaservice:KanaService){
    this.kanaservice.lastSearchedProducts$.pipe(

      // tap(info => console.log("lo que llega a lastSearchedProducts$",info)),
      tap(info => this.latestProductSearches = info ),
      // tap( ()=>console.log("ultimos productos en latestProductSearches.... ",this.latestProductSearches)
        // )
    )
    .subscribe();

    this.products = this.kanaservice.listProducts

  }








}
