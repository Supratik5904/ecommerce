import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_PATH = "http://localhost:8080/api/v1/products";

  constructor(private httpClient: HttpClient) { }

  public createProduct(product: FormData){
    return this.httpClient.post<Product>
    (this.API_PATH+"/add",product);
  }

  public getProducts(){
    return this.httpClient.get<Product[]>(this.API_PATH+"/allProducts")
  }

  public getProductById(productId:number){
    return this.httpClient.get<Product>(this.API_PATH+`/${productId}`)
  }

  public updateProduct(product: FormData){
    return this.httpClient.put(this.API_PATH+"/update",product);
  }
}
