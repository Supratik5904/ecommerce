import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ShowImageDialogComponent } from '../../show-images/show-image-dialog/show-image-dialog.component';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent {

  products?:Product[];

  constructor(private productService: ProductService,public dialog: MatDialog,private imageService:ImageProcessingService){}

  public ngOnInit(): void {

    this.productService.getProducts()
    .pipe(
      map((x: Product[], i)=> x.map((product: Product)=>{
        const productImages = this.imageService.createImage(product.productImages);
        product.productImages = productImages;
        return product;
      })
      )
      )
    .subscribe(
      (response)=>{
        this.products = response;
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  openDialog(product: Product) {
    this.dialog.open(ShowImageDialogComponent,{
      data:{
        image: product.productImages
      },
      height: '400px',
      width: '600px',
    });
  }

}
