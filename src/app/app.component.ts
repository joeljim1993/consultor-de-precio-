import { Component, inject } from '@angular/core';
import { KanaServiceService } from './services/kana-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public kanaService = inject( KanaServiceService )



}
