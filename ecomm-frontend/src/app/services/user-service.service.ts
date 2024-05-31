import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  API_PATH = "http://localhost:8080/api/v1/auth/";

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
}
