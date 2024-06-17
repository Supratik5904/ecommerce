import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() products?:Product[];


}
