import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddComponent } from './product-add.component';

describe('ProductAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
