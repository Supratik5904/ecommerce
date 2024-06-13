import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { map } from 'rxjs';
import { CartDataService } from './CartDataService';
import { CartProductEntity } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{
  cartItems:  CartProductEntity[] = [];
  productIdList : number[] = [];

  constructor(private productService: ProductService,private imageService: ImageProcessingService,private cartDataService: CartDataService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.cartItems = this.cartDataService.getCartItems();
    this.cartItems.map(item=>{
      this.productIdList.push(item.product.productId)
    });
    return this.productService.getProductDetails(this.productIdList).pipe(
      map((x: Product[], i)=> x.map((product: Product)=>{
        const productImages = this.imageService.createImage(product.productImages);
        product.productImages = productImages;
        return product;
      })
      )
      )
  }
}
