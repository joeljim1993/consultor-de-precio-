import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/index';
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
      tap(barcodeSearch => {

        this.kanaservice.searchProduct(barcodeSearch);
        this.inputDos.nativeElement.value = "";
      } ),

    )
      .subscribe();

  }

  searchProducts(): void {

    let barcodeSearch = this.txtInput.nativeElement.value;
    let productFound: Product[] |undefined = this.kanaservice.searchProduct(barcodeSearch);
    this.txtInput.nativeElement.value = "";
  }

}

//
7598001001018
