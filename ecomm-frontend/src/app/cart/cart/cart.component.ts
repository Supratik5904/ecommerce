import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartProductEntity, CartProductInput, Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CartDataService } from 'src/app/services/CartDataService';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: CartProductEntity[] = [];

  constructor(private router: Router,private cartService: CartService,private cartDataService: CartDataService){}

  ngOnInit(): void {
    this.cartService.getCartDetails().subscribe(
      (response)=>{
        this.cartItems = response.cartProductQuantities;
        this.cartDataService.setCartItems(this.cartItems);
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  getTotalAmount(quantity: number,price: number) {
    let totalPrice = quantity*price;
    return totalPrice;
  }
  calculateTotalAmount(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.product.productDiscountPrice * item.quantity;
    });
    return total;
  }


  removeItemFromCart(itemId: number) {
    let removedCartItem = this.cartItems.filter(cartItem=>cartItem.id === itemId);
    this.cartItems = this.cartItems.filter(cartItem=> cartItem.id !== itemId);
    let removeProductInput : CartProductInput = {
      productId: removedCartItem[0].product.productId,
      quantity:0
    }
    this.cartService.addToCartDetails(removeProductInput).subscribe(
      (res)=>{
        alert("Product Removed From Cart");
      }
    )
  }

  goToOrder() {
    this.cartDataService.setCartItems(this.cartItems);
    this.router.navigate(['/order'],{
      queryParams:{
        'cartCheckout': 'true'
      }
    })
  }


}
