import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import { MessagesModule } from 'primeng/messages';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LastSearchedComponent } from './components/last-searched/last-searched.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component'
import { SearchBoxComponent } from './components/search-box/search-box/search-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    MessagesModule,
    MatIconModule,
    MatProgressBarModule,
    NavbarComponent


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
