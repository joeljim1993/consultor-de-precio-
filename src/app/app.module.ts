import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import { MessagesModule } from 'primeng/messages';

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
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MessagesModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
