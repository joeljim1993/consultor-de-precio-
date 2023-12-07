import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { KanaService } from 'src/app/services/kana-service.service';

@Component({
  selector: 'price-dollar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './price dollar.component.html',
  styleUrls: ['./price dollar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceDollarComponent implements OnInit {

  public priceDollar:number=0;

  constructor(
    private kanaService:KanaService,
    private changeDetector: ChangeDetectorRef){}

ngOnInit(): void {

  this.kanaService.priceDivisa$
    .pipe(
      tap(price => {
        this.updatePriceDollar(price);
        this.changeDetector.detectChanges();

      }),

    ).subscribe();
}

updatePriceDollar(price:number){

  this.priceDollar = price;

}



}
