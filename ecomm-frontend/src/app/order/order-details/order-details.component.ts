import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CartProductEntity, Order, OrderProductQuantity, Product } from 'src/app/model/product.model';
import { CartDataService } from 'src/app/services/CartDataService';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {


  cartCheckout : boolean = false ;
  order: Order={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };
  products:Product[] =  [];
  maxSelect: number[] = Array.from({length: 30}, (_, i) => i + 1);
  cartItems: CartProductEntity[] = [];
  isCart: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartDataService: CartDataService){}

  ngOnInit(): void {
    const cartCheckoutValue = this.route.snapshot.queryParamMap.get('cartCheckout');
    this.cartCheckout = cartCheckoutValue !== null && cartCheckoutValue !== 'false';
    this.cartItems = this.cartDataService.getCartItems();
    this.cartItems.map(
      item =>{
        this.products.push(item.product);
      }
    )
  }



  placeOrder(orderForm: NgForm) {
      let orderProdQunatity :OrderProductQuantity[] = [];
      this.products.map(prod=>orderProdQunatity.push({productId:prod.productId,quantity:1}));
      this.order.orderProductQuantityList = orderProdQunatity;
      this.productService.placeOrder(this.order,this.cartCheckout).subscribe(
        (response)=>{
          orderForm.reset();
          alert("order placed");
          this.router.navigate(['/confirmOrder'],{
            queryParams:{
              "orderId":response.orderId
            }
          });
        }
      )
  }

  getProductQuantity(productId: number): any {
    const filteredProduct = this.cartItems.filter(item => item.product.productId === productId);
    return filteredProduct[0].quantity;
  }

  getTotalAmount(productId: number, productPrice: number){
    const filteredProduct = this.cartItems.filter(item => item.product.productId === productId);
    return filteredProduct[0].quantity * productPrice;
  }

  onQuantityChanged(quanitiy: any,productId: number) {
    this.cartItems.filter(item => item.product.productId === productId)[0].quantity = quanitiy;
  }

  calculateTotalAmount(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.product.productDiscountPrice * item.quantity;
    });
    return total;
  }

}
