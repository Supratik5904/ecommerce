import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';

@Component({
  selector: 'app-product-card-element',
  templateUrl: './product-card-element.component.html',
  styleUrls: ['./product-card-element.component.css']
})
export class ProductCardElementComponent {

  @Input() product: Product = {
    productId: 0,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscountPrice: 0,
    category: {
      id: 0,
      category: {
        categoryId: 0,
        categoryName: ''
      },
      subCategoryName: ''
    },
    productImages: []
  };

  constructor(private cdr: ChangeDetectorRef,private router: Router,private imageProcessSingService: ImageProcessingService){}

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.product.productImages= this.imageProcessSingService.createImage(this.product.productImages);
    this.cdr.detectChanges();
  }

  viewDetails(productId: number | undefined) {
    this.router.navigate(['/productDetails'],{
      queryParams:{
        'productId':productId
      }
    })
  }
  changeImage(event: any,id:number | undefined) {
    let imagele = document.getElementById(id+'image');
    imagele?.setAttribute('src',event.target.src);
  }
}
