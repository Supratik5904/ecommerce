import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review } from "../model/product.model";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ReviewService{
  private REVIEW_API_PATH = "http://localhost:8080/api/v1/reviews"

  constructor(private httpClient: HttpClient){}

  public getAllProductReviews( productId: number){
    return this.httpClient.get<Review[]>(this.REVIEW_API_PATH+`/?productId=${productId}`);
  }

  public addReview(review: Review,productId: number){
    return this.httpClient.post<Review>(this.REVIEW_API_PATH+`/productReviews?productId=${productId}`,review);
  }

}
