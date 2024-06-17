import { FileHandle } from "./file-handle.model";

export interface Product{
  productId: number,
  productName: string,
  productDescription: string,
  productPrice: number,
  productDiscountPrice: number,
  category: SubCategory,
  productImages: FileHandle[]
}

export interface Category{
  categoryId: number,
  categoryName: string
}

export interface SubCategory{
  id: number,
  category:Category,
  subCategoryName: string
}

export interface OrderDetail{
   orderId : number;
   orderFullName: string;
   orderFullOrder: string;
   orderContactNumber:string;
   orderAlternateContactNumber: string;
   orderStatus : string;
   orderAmount: number;
}

export interface Order{
  fullName : string,
  fullAddress: string,
  contactNumber: string,
  alternateContactNumber: string,
  orderProductQuantityList: OrderProductQuantity[]
}

export interface OrderProductQuantity{
  productId: number,
  quantity: number
}

export interface Cart{
  cartId: number,
  cartProductQuantities: CartProductEntity[]
}

export interface CartProductEntity{
  id: number,
  product: Product,
  quantity: number
}

export interface CartProductInput{
  productId: number,
  quantity: number
}

export interface OrderDetail{
  orderId: number;
  orderFullName : string;
  orderFullOrder : string;
  orderContactNumber: string;
  orderAlternateContactNumber: string;
  orderStatus: string;
  orderAmount: number;
  product: OrderProductQuantityMapping[]
}

export interface OrderProductQuantityMapping{
  id: number;
  product: Product;
  quantity : number
}


export interface Review{
  id : number;
  review : string;
  rating : number;
  product:Product;
}
