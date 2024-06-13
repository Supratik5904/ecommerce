import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/product.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() reviews?: Review[];

}
