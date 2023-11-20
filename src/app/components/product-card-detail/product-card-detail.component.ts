import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-card-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-card-detail.component.html',
  styleUrls: ['./product-card-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardDetailComponent { }
