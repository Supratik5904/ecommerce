import { FileHandle } from "./file-handle.model";

export interface Product{
  productId: number,
  productName: string,
  productDescription: string,
  productPrice: number,
  productDiscountPrice: number,
  category: Category,
  productImages: FileHandle[]
}

export interface Category{
  categoryId: number,
  categoryName: string
}
