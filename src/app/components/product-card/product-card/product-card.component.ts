import { Component } from '@angular/core';
import { KanaService } from '../../../services/kana-service.service';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/productForKana.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {


  public productFound:Product;

  constructor( private kanaService :KanaService){
    this.productFound={};
    // this.kanaService.productFound = this.productFound;
    this.kanaService.productFound
    .pipe(
      tap(info => console.log("loq ue llega en el pipe",info)
      ),
      tap(product => this.productFound = product),
      tap((info)=> console.log("product foun en product card",this.productFound)
       )
    )
    .subscribe()
  }





}
