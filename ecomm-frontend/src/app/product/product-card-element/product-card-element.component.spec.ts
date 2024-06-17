import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardElementComponent } from './product-card-element.component';

describe('ProductCardElementComponent', () => {
  let component: ProductCardElementComponent;
  let fixture: ComponentFixture<ProductCardElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
