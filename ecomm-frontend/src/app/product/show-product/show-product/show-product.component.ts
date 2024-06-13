import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ShowImageDialogComponent } from '../../show-images/show-image-dialog/show-image-dialog.component';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent {


  products:Product[] = [];
  searchKey: string = "";
  currentPage: number= 0;

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private imageService:ImageProcessingService,
    private router: Router){}

  public ngOnInit(): void {

    this.findProducts();
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

  openEditor(prodId: number) {
    this.router.navigate(['/editProduct'],{
      queryParams: {productId: prodId}
    })
  }

  onSearchDebounce(){
    setTimeout(()=>{this.onSearch()},2000);
  }



  onSearch() {
    this.productService.getProductsSearch(this.searchKey)
    .pipe(
      map((x: Product[])=> x.map((product: Product)=>{
        const productImages = this.imageService.createImage(product.productImages);
        product.productImages = productImages;
        return product;
      })
      )
      )
    .subscribe(
      (response)=>{
        this.products=[];
        response.map(p=> this.products.push(p));
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  private findProducts(){
    this.productService.getProductsBySearchKey(this.currentPage,this.searchKey)
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
         response.map(p=>this.products.push(p));
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  loadMoreProduct() {
    this.currentPage = this.currentPage+1;
    this.findProducts();
  }

}
