import { CommonModule } from '@angular/common';
import {  Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent  {

  public textNavbar:string= "Consultor de Precio "



 }
