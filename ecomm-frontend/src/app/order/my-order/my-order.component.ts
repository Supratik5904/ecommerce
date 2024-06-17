import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail, Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orderDetails : OrderDetail[] = [];
  filteredorderDetails: OrderDetail[] = [];
  order:OrderDetail={
    orderId: 0,
    orderFullName: '',
    orderFullOrder: '',
    orderContactNumber: '',
    orderAlternateContactNumber: '',
    orderStatus: '',
    orderAmount: 0,
    product: [
      {
        id: 0,
        product: {
          productId: 0,
          productName: '',
          productDescription: '',
          productPrice: 0,
          productDiscountPrice: 0,
          category: {
            id: 0,
            category: {
              categoryId: 0,
              categoryName: ''
            },
            subCategoryName: ''
          },
          productImages: []
        },
        quantity: 0
      }
    ]
  }
  selectedFilter:string = 'ALL';


  constructor(private productService: ProductService,private router: Router){};
  ngOnInit(): void {
    console.log(window.outerWidth);
    console.log(window.outerHeight);


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getUserOrderDetails().subscribe(
      (response)=>{
        this.orderDetails = response;
        this.filteredorderDetails = response;
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

  filterOrders(status: string){
    this.selectedFilter = status;
    if(status == 'ALL'){
      this.filteredorderDetails = this.orderDetails
    }else{
      this.filteredorderDetails = this.orderDetails.filter(order=> order.orderStatus == status);
    }
    }

    openOrderModal(order: OrderDetail){
      this.order =order;
    }
}
