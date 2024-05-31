import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { UserAuthService } from '../services/user-auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(
  private userService: UserServiceService,
  private userAuthService: UserAuthService,
  private router:Router){}

ngOnInit(): void{

}

public login(form: NgForm) {
this.userService.login(form.value).subscribe(
  (response)=>{
    const user : any = response || JsonPipe;
    this.userAuthService.setJwtToken(user.access_token);
    this.userAuthService.setRole(user.role);
    this.userAuthService.sendIsLoggedIn(true);
    this.router.navigate(['/home']);
  },
  (error)=>{
    console.log(error);
  }
)
}

}
