import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-last-searched',
  templateUrl: './last-searched.component.html',
  styleUrls: ['./last-searched.component.css']
})
export class LastSearchedComponent {


  public latestProductSearches= [
    {
      imgSrc:"https://labatata.com.ve/1358-large_default/aceite-de-soya-concordia-1l.jpg"   ,
      name:"Aceite Concordia",
      priceVED: 40.50,
      priceUSD: 1.51,
    },
    {
      imgSrc:"https://compraenavi.com/web/image/product.template/1355/image",
      name:"Cafe Cordeillera",
      priceVED: 100.50,
      priceUSD:10.51,
    },
    {
      imgSrc:"https://tienda.tuexpressonline.com/web/image/product.template/10112/image_1024?unique=f8371d5",
      name:"sardina Mar bonito",
      priceVED: 30.50,
      priceUSD: 2.51,
    }
  ];






}
