import { Injectable } from '@angular/core';
import { Category, Order, OrderDetail, Product, SubCategory } from '../model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  API_PATH = "http://localhost:8080/api/v1/products";
  CATEGORY_API_PATH = "http://localhost:8080/api/v1/category";
  ORDER_API_PATH = "http://localhost:8080/api/v1/orders";

  constructor(private httpClient: HttpClient) { }

  public createProduct(product: FormData){
    return this.httpClient.post<Product>
    (this.API_PATH+"/add",product);
  }

  public getCategories(){
    return this.httpClient.get<Category[]>(this.CATEGORY_API_PATH);
  }

  public getSubCategoriesByCategory(categoryName: string){
    return this.httpClient.get<SubCategory[]>(this.CATEGORY_API_PATH+`/subCategory?parentCategory=${categoryName}`);
  }

  public getProductsByCategory(currentPage:number,categoryName: string){
    return this.httpClient.get<Product[]>(this.API_PATH+"/allProducts/byCategory"+`?pageNumber=${currentPage}&category=${categoryName}`)
  }

  public getProductsSearch(searchKey: string) {
    return this.httpClient.get<Product[]>(this.API_PATH+"/allProducts/search"+`?searchKey=${searchKey}`)
  }


  public createCategory(category: Category){
    return this.httpClient.post<Category>(this.CATEGORY_API_PATH+`/addCategory`,category);
  }

  public getProducts(){
    return this.httpClient.get<Product[]>(this.API_PATH+"/allProducts")
  }

  public getRandomProductsByCategory(id: number) {
    return this.httpClient.get<Product[]>(this.API_PATH+`/get/random/${id}`)
  }


  public getProductsBySearchKey(currentPage:number,searchKey: string){
    return this.httpClient.get<Product[]>(this.API_PATH+"/allProducts/searchQuery"+`?pageNumber=${currentPage}&searchKey=${searchKey}`)
  }

  public getProductById(productId:number){
    return this.httpClient.get<Product>(this.API_PATH+`/get/${productId}`)
  }

  public updateProduct(product: FormData){
    return this.httpClient.put(this.API_PATH+"/update",product);
  }

  public placeOrder(order: Order,cartCheckout: boolean){
    return this.httpClient.post<OrderDetail>(this.ORDER_API_PATH+`/placeOrder?cartCheckOut=${cartCheckout}`,order);
  }

  public getProductDetails(productIdList: number[]) {
    return this.httpClient.post<Product[]>(this.API_PATH+"/get/productDetails",productIdList)
  }

  public getUserOrderDetails(){
    return this.httpClient.get<OrderDetail[]>(this.ORDER_API_PATH);
  }

  public getAllOrders(){
    return this.httpClient.get<OrderDetail[]>(this.ORDER_API_PATH+"/getAll");
  }

  public getOrderById(orderId: number) {
    return this.httpClient.get<OrderDetail>(this.ORDER_API_PATH+`/${orderId}`);
  }

  public getSubCategories(){
    return this.httpClient.get<SubCategory[]>(this.CATEGORY_API_PATH+"/subCategory")
  }

  public updateOrderStatus(orderId: number, status: string){
    return this.httpClient.put(this.ORDER_API_PATH+`/${orderId}`,status);
  }
}
