import { Component, OnInit } from '@angular/core';
import { KanaService } from '../../../services/kana-service.service';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/productForKana.interface';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  public messages:any;
  public productFound!:Product;

  constructor( private kanaService :KanaService){


    // this.kanaService.productFound = this.productFound;
    this.kanaService.productFound
    .pipe(

      tap(product => this.productFound = product),
      tap((info)=> console.log("product found en product card",this.productFound)
       ),

    )
    .subscribe()
  }

  ngOnInit(): void {
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'Producto no Encontrado ' }];
  }



}
