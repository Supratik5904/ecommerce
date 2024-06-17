import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  selectedUser:User = {
    userId: 0,
    firstName: '',
    lastName: '',
    userName: '',
    addressList: [
      {
        id: 0,
        user: {},
        addressLine:'',
        city: "",
        pinCode: 0,
        state: ""
      }
    ],
    contactNumber: 0
  };
  users: User[] = [];

  constructor(private userService: UserServiceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.users= response;
      }
    )

  }



  openOrderModal(user: User){
    this.selectedUser =user;
    this.userService.getAddressByUserId(user.userId).subscribe(
      (response)=>{
        this.selectedUser.addressList= response;
      }
    )
  }

}
