import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product";
import {Router} from "@angular/router";
import {WebService} from "../../../services/web.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

/**
 * Product component to manage new products
 */
export class ProductAddComponent implements OnInit {
  angForm !: FormGroup;
  urlPart: string = "products/"

  constructor(private formBuilder: FormBuilder,
              private productService: WebService<Product>,
              private router: Router) {
  }

  /**
   * Initialize form at start
   */
  ngOnInit(): void {
    this.createForm()
  }

  /**
   * Product creation form with validations constraints
   * @private
   */
  private createForm() {
    this.angForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(4)]],
      productDescription: ['', [Validators.required, Validators.minLength(10)]],
      productPrice: ['', Validators.required]
    })
  }

  /**
   * When submitted a new product is created and we're redirected to main page.
   */
  onSubmit(): void {
    let productData = this.angForm.value
    this.addProduct(productData.productName, productData.productDescription, productData.productPrice);
    this.router.navigate([''])
  }

  /**
   * Add a product to DB
   * @param productName
   * @param productDescription
   * @param productPrice
   */
  addProduct(productName: string, productDescription: string, productPrice: number): void {
    let product = new Product(productName, productDescription, productPrice)
    this.productService.addData(product, this.urlPart);
  }
}
