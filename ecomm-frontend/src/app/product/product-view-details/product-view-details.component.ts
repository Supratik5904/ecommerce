import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartProductEntity, CartProductInput, Product, Review } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CartDataService } from 'src/app/services/CartDataService';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {


  reviews?: Review[];
  showReview: boolean =false;
  product!:Product;
  suggestedProducts : Product[] = [];
  quantity: number = 1;
  maxSelect: number[] = Array.from({length: 30}, (_, i) => i + 1);
  cartProductInput : CartProductInput = {
    productId: 0,
    quantity: this.quantity
  };
  public isLoggedIn : boolean = false;

  cartProductEntity :CartProductEntity={
    id: 0,
    product: {
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
    },
    quantity: 0
  }


  constructor(private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageProcessingService,
    private cartService: CartService,
    private cartDataService: CartDataService,
    private productService: ProductService,
    private userAuthService: UserAuthService,
    private reviewService: ReviewService){}


  ngOnInit(): void {
    this.userAuthService.isLoggedIn$.subscribe(
      (res)=>{
        this.isLoggedIn = res;
      }
    )
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.queryParams.subscribe(
      params=>{
        const productId = params['productId'];
        this.productService.getProductById(productId).subscribe(
          (response)=>{
            this.product = response;
            this.reviewService.getAllProductReviews(this.product.productId).subscribe(
              (response)=>{
                this.reviews = response;
              }
            )
            this.productService.getRandomProductsByCategory(this.product.category.id).subscribe(
              (response)=>{
                this.suggestedProducts = response.filter((prod)=> prod.productId !== this.product.productId);
                if(this.suggestedProducts.length>4){
                  this.suggestedProducts.slice(0,3);
                }
                this.suggestedProducts.map(prod=>{
                  prod.productImages = this.imageService.createImage(prod.productImages)
                })
              }
            )
            this.product.productImages= this.imageService.createImage(this.product.productImages);
          },
          (error)=>{
            console.error("Unable to fetch");

          }
        )
      }
    )

  }


  toggleReviews(){
    this.showReview = !this.showReview;
  }


  buy(prod: Product) {
    this.cartProductEntity.product = prod;
    this.cartProductEntity.quantity = this.quantity;
    this.cartDataService.setCartItems([this.cartProductEntity]);
    this.router.navigate(['/order'],{
      queryParams:{
        'cartCheckout': 'false'
      }
    })
  }

  addToCart(prod: Product) {
    this.cartProductInput.productId = prod.productId;
    this.cartProductInput.quantity = this.quantity;
    this.cartService.addToCartDetails(this.cartProductInput).subscribe(
      (response)=>{
        alert("item added to cart")
        this.router.navigate(['/cart']);
      },
      (error)=>{
        console.log(error);

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

  changeImage(event: any,id:number) {
    let imagele = document.getElementById(id+'image');
    imagele?.setAttribute('src',event.target.src);
  }

}
