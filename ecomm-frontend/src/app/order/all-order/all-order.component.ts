import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/model/product.model';
import { User } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})


export class AllOrderComponent {

  users$?: Observable<User[]>;

  orderDetails : OrderDetail[] = [];
  selectedFilter:string = 'ALL';
  orderTitle?:string;
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

  filterOrdersByUserName(userName: string) {
    this.productService.getAllOrders().subscribe(
      (response)=>{
        this.orderDetails = response.filter(order=> order.orderFullName.includes(userName));
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  constructor(private productService: ProductService,private router: Router,public userService: UserServiceService){};
  ngOnInit(): void {
    this.orderTitle = this.selectedFilter.concat(" ORDERS");
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
    this.users$ = this.userService.getAllUsers();
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

  filterOrders(status: string){
    this.selectedFilter = status;
    this.orderTitle = this.selectedFilter.concat(" ORDERS");

    this.productService.getAllOrders().subscribe(
      (response)=>{
        this.orderDetails = response.filter(order=> status!= "ALL" ?order.orderStatus == status:order.orderStatus);
      },
      (error)=>{
        console.log(error);

      }
    )  }

    openOrderModal(order: OrderDetail){
      this.order =order;
    }

}
