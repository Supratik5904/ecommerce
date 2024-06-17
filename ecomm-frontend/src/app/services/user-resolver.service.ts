import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { UserServiceService } from "./user-service.service";
import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserResolverService implements Resolve<User>{

  constructor(private userService: UserServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getLoggedInUser();
  }

}
