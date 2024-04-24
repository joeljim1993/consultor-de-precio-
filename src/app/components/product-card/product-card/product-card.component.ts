import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { KanaService } from '../../../services/kana-service.service';
import { tap, timeout } from 'rxjs';
import { Product } from 'src/app/interfaces/productForKana.interface';
import { Message } from 'primeng/api';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public messages: any;
  public productFound!: Product;
  public priceProduct: number = 0;

  public dollarRate: number = 0;



  constructor(private kanaService: KanaService) {

    this.kanaService.productFound$
      .pipe(
        tap(info => console.log("lo que llega antes de actualizar",info)),
        tap((product) => {
          this.productFound = product;
          console.log('producto traido ', product);



          if (!this.productFound) {
            return;
          }
          let pricePublished = product.pricePublished?.priceBase.amount;
          this.priceProduct = +pricePublished;
          console.log(
            ' this.productFound',
            product.pricePublished?.priceBase.amount
          );
          console.log('priceProduct', this.priceProduct);
        })
      )
      .subscribe();

      this.kanaService.priceDivisa$
      .pipe(
        tap( dolarValue => this.dollarRate = dolarValue ),
        tap(()=>console.log("valor del dolar en product card",this.dollarRate,typeof(this.dollarRate)))
      )
      .subscribe();

  }

  ngOnInit(): void {
    this.messages = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Producto no Encontrado ',
      },
    ];
  }
}
