import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/productForKana.interface';
import { KanaService } from 'src/app/services/kana-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild("txtInput")
  public txtInput!: ElementRef<HTMLInputElement>;

  @ViewChild("inputDos")
  public inputDos!: ElementRef<HTMLInputElement>;

  @Output()
  public newProduct: EventEmitter<Product> = new EventEmitter();

  inputSearch = new FormControl();

  constructor(private kanaservice: KanaService) {
    this.inputSearch.valueChanges.pipe(
      debounceTime(400),
      tap(info => console.log("infooooo", info)
      ),
      tap(barcodeSearch => {
        this.kanaservice.searchProduct(barcodeSearch);


        this.inputDos.nativeElement.value = "";
      } ),

    )
      .subscribe();

  }

  searchProducts(): void {

    let barcodeSearch = this.txtInput.nativeElement.value;
    console.log("buscando", barcodeSearch);

    let productFound: Product[] = this.kanaservice.searchProduct(barcodeSearch)
    // console.log("productfound*------", productFound);
    // this.newProduct.emit( productFound[0] )
    // se limpia el valor


    this.txtInput.nativeElement.value = "";
  }

}

//
7598001001018
