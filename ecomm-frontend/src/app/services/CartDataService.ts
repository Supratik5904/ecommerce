import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductEntity } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private cartItemsSubject: BehaviorSubject<CartProductEntity[]> = new BehaviorSubject<CartProductEntity[]>([]);
  cartItems$: Observable<CartProductEntity[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  setCartItems(cartItems: CartProductEntity[]) {
    this.cartItemsSubject.next(cartItems);
  }

  getCartItems(): CartProductEntity[] {
    return this.cartItemsSubject.getValue();
  }
}
