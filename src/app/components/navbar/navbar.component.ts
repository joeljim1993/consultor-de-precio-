import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Pipe } from '@angular/core';
import { tap } from 'rxjs/operators';
import { KanaService } from 'src/app/services/kana-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  public textNavbar:string= "Consultor de Precio "
  public priceDollar:number=0;

  constructor( private kanaService:KanaService){

  }

ngOnInit(): void {
  this.kanaService.priceDivisa$
    .pipe(
      tap(info => console.log("lo que llega en navbar",info)),
      tap(price => this.priceDollar = price),
      tap(()=>console.log("este es el precio del dolar",this.priceDollar)
       )
    ).subscribe();

    console.log("priceDollar despues del oninit",this.priceDollar)
}


 }
