import { Component, Input, inject } from '@angular/core';
import { KanaService } from './services/kana-service.service';
import { Product } from './interfaces/productForKana.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public kanaService = inject( KanaService )


  //TODO: esto lo dejaria despejado

  newProduct(product: any):void{
    console.log("ejeciutando ");

  console.log("producto encontado pasado a product card", product);

}

}
