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

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public messages: any;
  public productFound!: Product;
  public priceProduct: number = 0;

  public dollarRate: number = 35.96;

  public productForTest: any = {
    barcode: '7592591000154',
    departments: [],
    id: 'pdt:61',
    images: [
      'http://kana.develop.cecosesola.imolko.net/web/aws-space/assets/images/products/33ed4b55c83443fa94d7c7ff.png',
    ],
    name: 'Harina de Maiz Doña Emilia ',
    presentation: 'un kilo ',
    pricePublished: {
      priceBase: {
        amount: '0.66521087496549820591',
      },
    },
  };

  constructor(private kanaService: KanaService) {
    // this.kanaService.productFound = this.productFound;
    this.kanaService.productFound$
      .pipe(
        // tap(info => console.log("lo que llega antes de actualizar",info)),
        tap((product) => {
          // this.productFound = product;
          console.log('producto traido ', product);

          //TODO: linea agregada para cambiar css
          this.productFound = this.productForTest

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
