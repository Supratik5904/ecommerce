import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuardGuard } from './auth/admin-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { UserGuardGuard } from './auth/user-guard.guard';
import { ProductComponent } from './product/add-product/product.component';
import { ShowProductComponent } from './product/show-product/show-product/show-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductViewDetailsComponent } from './product/product-view-details/product-view-details.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { CartComponent } from './cart/cart/cart.component';
import { MyOrderComponent } from './order/my-order/my-order.component';
import { InvoiceComponent } from './order/invoice/invoice.component';
import { InvoiceResolverService } from './services/invoice-resolver.service';
import { AllOrderComponent } from './order/all-order/all-order.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"addNewProduct",component:ProductComponent,canActivate:[AdminGuardGuard]},
  {path:"editProduct",component:EditProductComponent,canActivate:[AdminGuardGuard],resolve:{product: ProductResolverService}},
  {path:"showProducts",component: ShowProductComponent,canActivate: [AdminGuardGuard]},
  {path:"productDetails",component: ProductViewDetailsComponent},
  {path:"admin",component:AdminComponent, canActivate: [AdminGuardGuard]},
  {path:"order",component:OrderDetailsComponent,canActivate:[UserGuardGuard]},
  {path:"user",component:UserComponent,canActivate: [UserGuardGuard]},
  {path:"login",component:LoginComponent},
  {path:"cart",component: CartComponent,canActivate: [UserGuardGuard]},
  {path:"myOrders",component:MyOrderComponent,canActivate: [UserGuardGuard]},
  {path:"allOrders",component: AllOrderComponent,canActivate: [AdminGuardGuard]},
  {path:"confirmOrder",component:InvoiceComponent,canActivate:[UserGuardGuard],resolve:{orderDetail: InvoiceResolverService}},
  {path:"forbidden",component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
