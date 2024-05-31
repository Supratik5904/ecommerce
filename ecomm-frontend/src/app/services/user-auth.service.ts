import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() { }

  public sendIsLoggedIn(loggedIn: boolean){
    this.isLoggedIn.next(loggedIn);
  }

  public setRole(role: string){
    window.localStorage.setItem('roles',role);
  }

  public getRole(){
    return window.localStorage.getItem("roles");
  }

  public getJwtToken(){
    return window.localStorage.getItem("access_token");
  }

  public setJwtToken(jwtToken: string){
    window.localStorage.setItem("access_token",jwtToken);
  }

  public clear(){
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("roles");
  }
}
