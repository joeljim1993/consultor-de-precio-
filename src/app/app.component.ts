import { Component, Input, OnInit, inject } from '@angular/core';
import { KanaService } from './services/kana-service.service';
import { Product } from './interfaces/productForKana.interface';
import { debounceTime, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public kanaService = inject( KanaService )
  public showComponent= false;

  //TODO: esto lo dejaria despejado



ngOnInit(): void {

  this.kanaService.productFound$
    .pipe(
      tap( info => console.log("que esta llegando en app  ",info)),
      tap( product => {
        // el behaviorSubject trae 0, cuando no existen busquedas
        if(product !=0 ){
          this.showComponent= true ;
        }
      } ),
      debounceTime(5000),
      tap(()=> this.showComponent = false)

    )
    .subscribe();

}

}
