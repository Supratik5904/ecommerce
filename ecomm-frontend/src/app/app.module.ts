import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserAuthService } from './services/user-auth.service';
import { ProductService } from './services/product.service';
import { UserServiceService } from './services/user-service.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { AlertComponent } from './alert/alert.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive'
import { ProductComponent } from './product/add-product/product.component';
import { ShowProductComponent } from './product/show-product/show-product/show-product.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ShowImageDialogComponent } from './product/show-images/show-image-dialog/show-image-dialog.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductViewDetailsComponent } from './product/product-view-details/product-view-details.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { MyOrderComponent } from './order/my-order/my-order.component';
import { InvoiceComponent } from './order/invoice/invoice.component';
import { ReviewsComponent } from './product/reviews/reviews.component';
import { AllOrderComponent } from './order/all-order/all-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    ProductComponent,
    ForbiddenComponent,
    AlertComponent,
    DragDirective,
    ShowProductComponent,
    ShowImageDialogComponent,
    EditProductComponent,
    ProductViewDetailsComponent,
    OrderDetailsComponent,
    CartComponent,
    MyOrderComponent,
    InvoiceComponent,
    ReviewsComponent,
    AllOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
    UserAuthService,
    ProductService,
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
