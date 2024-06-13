import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent {

  orderDetails : OrderDetail[] = [];

  constructor(private productService: ProductService,private router: Router){};
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getAllOrders().subscribe(
      (response)=>{
        this.orderDetails = response
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  changeOrderStatus(event: any,order: OrderDetail){
    if(event.target.name == "cancel"){
      this.productService.updateOrderStatus(order.orderId,"CANCELLED").subscribe(
        (response)=>{
          alert("Order Marked as Cancelled");
          order.orderStatus="CANCELLED"
        }
      );
    }if(event.target.name == "delivered"){
      this.productService.updateOrderStatus(order.orderId,"DELIVERED").subscribe(
        (response)=>{
          alert("Order Marked as Delivered");
          order.orderStatus = "DELIVERED";
        }
      );
    }

  }

}
