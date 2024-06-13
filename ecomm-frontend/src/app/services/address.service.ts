import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Address } from "../model/product.model";

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

  public addAddress(address: Address){
    return this.httpClient.post<Address[]>(this.ADDRESS_API_PATH,address);
  }

  public updateAddress(address: Address){
    return this.httpClient.post<Address[]>(this.ADDRESS_API_PATH,address);
  }

}
