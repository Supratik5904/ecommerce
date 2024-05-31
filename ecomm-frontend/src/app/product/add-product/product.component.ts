import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product.model';
import { FileHandle } from 'src/app/model/file-handle.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product : Product = {
    productId: 0,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscountPrice: 0,
    productImages: [],
    category: {
      categoryName: '',
      categoryId: 0
    }
  }
  constructor(private productService: ProductService,private sanitizer: DomSanitizer){}

  onProductAdd(productForm: NgForm) {
    this.productService.createProduct(this.prepareFormData(this.product)).subscribe(
      (response: Product) =>   {
        productForm.reset();
        alert("Product Added")
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData{
    const formData =new FormData();
    formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));
    for(let i=0;i<product.productImages.length;i++){
      formData.append(
        'image',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
    return formData;
  }

  onFileSelect(event: any) {
   if(event?.target.files){
    const file = event.target.files[0];

    const fileHandle : FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
    this.product.productImages.push(fileHandle);
   }
  }

  removeImages(index: number) {
    let newProductImages = this.product.productImages.filter((img,i)=> i != index);
    this.product.productImages = newProductImages;
    }

  fileDropped(fileHandle: FileHandle) {
      this.product.productImages.push(fileHandle);
    }

}
