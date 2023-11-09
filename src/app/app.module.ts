import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LastSearchedComponent } from './components/last-searched/last-searched.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component'
import { SearchBoxComponent } from './components/search-box/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LastSearchedComponent,
    SearchBoxComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
