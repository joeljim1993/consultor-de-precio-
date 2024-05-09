import { Component, Input, OnInit, inject } from '@angular/core';
import { KanaService } from './services/kana-service.service';
import { Product } from './interfaces/index';
import { debounceTime, tap, timer } from 'rxjs';

import { registerLocaleData } from '@angular/common';

// manera como se importa los locales
import localesEsVE from '@angular/common/locales/es-VE'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// se llama para poder registrar todos los locales
registerLocaleData( localesEsVE);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public kanaService = inject( KanaService )
  public showComponent= false;

  // producto creado para el css de la card

constructor( private sanitizer: DomSanitizer){}



ngOnInit(): void {


  this.kanaService.productFound$
    .pipe(
      tap( product => {
        // el behaviorSubject trae 0, cuando no existen busquedas
        if(product !=0 ){
          this.showComponent= true ;
        }
      } ),
      debounceTime(12000),
      tap(()=> this.showComponent = false)

    )
    .subscribe();

}

}
