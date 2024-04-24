import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { KanaService } from '../../../services/kana-service.service';
import { tap,  } from 'rxjs';
import { Product } from 'src/app/interfaces/productForKana.interface';

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

  private  kanaService = inject( KanaService );

  constructor() {

    this.kanaService.productFound$
      .pipe(
        tap( product => {
          this.productFound = product;
          if (!this.productFound) {
            return;
          };
          let pricePublished = product.pricePublished?.priceBase.amount;
          this.priceProduct = +pricePublished;
        })
      ).subscribe();

      this.kanaService.priceDivisa$
      .pipe(
        tap( dolarValue => this.dollarRate = dolarValue ),
      ).subscribe();

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
