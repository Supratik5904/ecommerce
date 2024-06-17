export interface User{
   userId :number;
   firstName:string;
   lastName: string;
   userName: string;
   contactNumber:number;
   addressList: Address[]
}

export interface Address{
  id: number;
  user:{},
  addressLine:string,
  city: string;
  pinCode : number;
  state : string;
}

export interface Places{
  state: string;
  cities:string[];
}
