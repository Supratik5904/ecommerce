import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Address, User } from "../model/user.model";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AddressService{
  private ADDRESS_API_PATH = "http://localhost:8080/api/v1/address"

  constructor(private httpClient: HttpClient){}

  public getAllAddressForUser(){
    return this.httpClient.get<Address[]>(this.ADDRESS_API_PATH);
  }

  public addAddress(address: Address,user: User | undefined){
    return this.httpClient.post<Address>(this.ADDRESS_API_PATH,address);
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
