import { Component } from '@angular/core';
import { Category, Product, SubCategory } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { map, Subscription } from 'rxjs';
import { ImageProcessingService } from '../services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  searchKey: string = "";
  currentPage: number =0 ;
  products: Product[] = [];
  productSubscription!: Subscription;
  filterCategory = 0;
  allCategories: Category[] = [];
  allSubCategories?: SubCategory[];

  constructor(private productService: ProductService,
    private imageService: ImageProcessingService,
    private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.findProducts()
    this.productService.getCategories().subscribe(
      (response)=>{
        this.allCategories=response;
      }
    )
    this.productService.getSubCategories().subscribe(
      (response)=>{
        this.allSubCategories=response;
      }
    )

  }

  viewDetails(productId: number) {
    this.router.navigate(['/productDetails'],{
      queryParams:{
        'productId':productId
      }
    })
  }

  private findProducts(){
    this.productService.getProductsByCategory(this.currentPage,+this.filterCategory,this.searchKey)
    .subscribe(
      (response)=>{
        response.map(p=> this.products.push(p));
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  onSearchDebounce(){
    setTimeout(()=>{this.onSearch()},500);
  }


  onSearch() {
    this.productService.getProductsSearch(this.searchKey)
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

  loadMoreProduct() {
    this.currentPage = this.currentPage+1;
    this.findProducts();
  }

  changeImage(event: any,id:number) {
    let imagele = document.getElementById(id+'image');
    imagele?.setAttribute('src',event.target.src);
  }

  changeCategory($event: any) {
      this.currentPage= 0;
      if($event == "all"){
        this.filterCategory=0;
      }
      this.productService.getProductsByCategory(this.currentPage,+this.filterCategory,this.searchKey)
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
}
