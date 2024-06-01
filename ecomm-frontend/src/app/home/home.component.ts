import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { map, Subscription } from 'rxjs';
import { ImageProcessingService } from '../services/image-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: Product[];
  productSubscription!: Subscription;

  constructor(private productService: ProductService,private imageService: ImageProcessingService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getProducts()
    .pipe(
      map((x: Product[], i)=> x.map((product: Product)=>{
        const productImages = this.imageService.createImage(product.productImages);
        product.productImages = productImages;
        return product;
      })
      )
      )
    .subscribe(
      (response)=>{
        this.products = response;
      },
      (error)=>{
        console.log(error);

      }
    )

  }


}
