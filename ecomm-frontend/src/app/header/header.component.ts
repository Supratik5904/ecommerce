import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isLoggedIn : boolean = false;
  public isAdmin : boolean = false;
  public subscription !: Subscription;
  showUserSideBar: boolean = false;
  constructor(private userAuthService :UserAuthService,private router: Router){}

  ngOnInit() : void{
    this.userAuthService.isLoggedIn$.subscribe(
      (res)=>{
        this.isLoggedIn = res;
        this.isAdmin = (this.userAuthService.getRole() === "ADMIN" ? true : false);
      }
    )
  }
  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
    this.userAuthService.sendIsLoggedIn(false);
  }

  toggleUserSideBar(){
    this.showUserSideBar = !this.showUserSideBar
  }
}
