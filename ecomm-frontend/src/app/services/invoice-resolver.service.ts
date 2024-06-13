import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { OrderDetail } from "../model/product.model";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";
import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn:"root"
  }
)
export class InvoiceResolverService implements Resolve<OrderDetail>{

  constructor(private productService: ProductService){};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrderDetail | Observable<OrderDetail> | Promise<OrderDetail> {
    const orderId = route.queryParams['orderId'];
    return this.productService.getOrderById(orderId)
  }

}
