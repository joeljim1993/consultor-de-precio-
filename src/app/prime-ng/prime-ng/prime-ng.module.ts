import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    InputTextModule,
    DataViewModule
  ]
})
export class PrimeNgModule { }
