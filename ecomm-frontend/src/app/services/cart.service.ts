import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, CartProductInput } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_API_PATH = "http://localhost:8080/api/v1/cart"

  constructor(private httpClient: HttpClient) { }

  public getCartDetails(){
    return this.httpClient.get<Cart>(this.CART_API_PATH);
  }

  public addToCartDetails(cartProductInput:  CartProductInput){
    return this.httpClient.post<Cart>(this.CART_API_PATH+"/addToCart",cartProductInput)
  }

}
