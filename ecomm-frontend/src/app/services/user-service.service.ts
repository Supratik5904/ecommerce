import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address, User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  API_PATH = "http://localhost:8080/api/v1/auth/";
  USER_API_PATH = "http://localhost:8080/api/v1/user"
  ADDRESS_API_PATH = "http://localhost:8080/api/v1/address"


  constructor(private httpClient : HttpClient) { }

  public login(loginData:any){
    const requestHeader=new HttpHeaders({
      "No_Auth":"True"
    });
    return this.httpClient.post
    (this.API_PATH+"authenticate",loginData,{headers:requestHeader});
  }

  public signUp(loginData:any){
    const requestHeader=new HttpHeaders({
      "No_Auth":"True"
    });
    return this.httpClient.post
    (this.API_PATH+"register",loginData,{headers:requestHeader});
  }

  public getAllUsers(){
    return this.httpClient.get<User[]>(this.USER_API_PATH);
  }

  public getLoggedInUser(){
    return this.httpClient.get<User>(this.USER_API_PATH+"/loggedInUser");
  }

  public updateUser(user: User){
    return this.httpClient.put<User>(this.USER_API_PATH+`${user.userId}`,user);
  }

  public addAddress(address: Address,user: User | undefined){
    return this.httpClient.post<Address>(this.ADDRESS_API_PATH+`user=${user}`,address);
  }

  public updateAddress(address: Address){
    return this.httpClient.put<Address[]>(this.ADDRESS_API_PATH+`${address.id}`,address);
  }

  public getAddressForLoggedInUser(){
    return this.httpClient.get<Address[]>(this.ADDRESS_API_PATH);
  }

  public getAddressByUserId(userId: number){
    return this.httpClient.get<Address[]>(this.ADDRESS_API_PATH+`/${userId}`);
  }
}
