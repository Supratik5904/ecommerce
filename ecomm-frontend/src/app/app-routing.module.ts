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

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"addNewProduct",component:ProductComponent,canActivate:[AdminGuardGuard]},
  {path:"showProducts",component: ShowProductComponent,canActivate: [AdminGuardGuard]},
  {path:"admin",component:AdminComponent, canActivate: [AdminGuardGuard]},
  {path:"user",component:UserComponent,canActivate: [UserGuardGuard]},
  {path:"login",component:LoginComponent},
  {path:"forbidden",component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
