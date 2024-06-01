import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Product } from 'src/app/model/product.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  product!: Product;

  constructor(private route: ActivatedRoute
    ,private sanitizer: DomSanitizer
    ,private imageService: ImageProcessingService
    ,private productService: ProductService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.data
    .subscribe(
      (response)=>{
        console.log(response['product']);
        this.product = response['product']
        this.product.productImages= this.imageService.createImage(this.product.productImages);
      },
      (error)=>{
        console.log("unable to fetch product :",error);

      }
    )
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

   onProductEdit(productForm: NgForm) {
    this.productService.updateProduct(this.prepareFormData(this.product)).subscribe(
      (response) =>   {
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

}
