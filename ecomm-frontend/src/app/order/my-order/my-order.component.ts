import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orderDetails : OrderDetail[] = [];

  constructor(private productService: ProductService,private router: Router){};
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getUserOrderDetails().subscribe(
      (response)=>{
        console.log(response);
        this.orderDetails = response
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  downloadInvoice(orderId: number) {
    this.router.navigate(['/confirmOrder'],{
      queryParams:{
        "orderId":orderId
      }
    });
  }

  cancelOrder(order: OrderDetail) {
    this.productService.updateOrderStatus(order.orderId,"CANCELLED").subscribe(
      (response)=>{
        alert("Order Marked as Cancelled");
        order.orderStatus="CANCELLED"
      }
    );
  }
}
