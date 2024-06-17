import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address, Places, User } from 'src/app/model/user.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  user: User={
    userId: 0,
    firstName: '',
    lastName: '',
    userName: '',
    contactNumber: 0,
    addressList: []
  }

  addressList: string[] = [];
  address: Address={
    id: 0,
    user: {},
    city: '',
    pinCode: 0,
    state: '',
    addressLine: ''
  }

  constructor(private route:ActivatedRoute,private addressService: AddressService){}

  ngOnInit(): void {
    this.route.data.subscribe(
      (response)=>{
          this.user = response['user'];
          this.user.addressList.map(ad =>{this.addressList.push(ad.addressLine+' '+ad.city+' ,'+ad.state+' ,'+ad.pinCode)})
      }
    )

  }

  openOrderModal(user: User){

  }

  addAddress(addressForm: NgForm){
    const value = addressForm.value;
    this.address.city = value.city;
    this.address.addressLine= value.addressLine;
    this.address.state = value.state;
    this.address.pinCode = value.zip;
    this.addressService.addAddress(this.address,undefined).subscribe(
      (response)=>{
        addressForm.reset();
        alert("Address Added");
      }
    );
  }

}
