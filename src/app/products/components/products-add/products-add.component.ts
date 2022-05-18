import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product, Stock} from "../../model/product";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {UrlParts} from "../../../utils/urlParts";

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})

/**
 * Product component to manage new products
 */
export class ProductsAddComponent implements OnInit {
  angForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productService: ApiService<Product>,
              private stockService: ApiService<Stock>,
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
      productPrice: ['', Validators.required],
      productStock: ['', Validators.required]
    })
  }

  /**
   * When submitted a new product is created and we're redirected to main page.
   */
  onSubmit(): void {
    let productData = this.angForm.value
    this.addProduct(productData.productName, productData.productDescription, productData.productPrice, productData.productStock);
    this.router.navigate([''])
  }

  /**
   * Add a product to DB with corresponding stock
   * @param productName
   * @param productDescription
   * @param productPrice
   * @param productStock
   */
  addProduct(productName: string, productDescription: string, productPrice: number, productStock: number): void {
    let product = new Product(productName, productDescription, productPrice)
    this.productService.addData(product, UrlParts.products).subscribe({
      next: () => this.addStock(productStock),
      error: err => console.log(`Error while adding data (${UrlParts.products}): ` + err),
      complete: () => console.log(`Post data complete (${UrlParts.products})`)
    });
  }

  /**
   * Adds stock from latest created product, by retrieving last entry in DB
   * @param productStock
   */
  addStock(productStock: number) {
    this.productService.getAllData(UrlParts.products).subscribe(
      data => this.stockService.addData(new Stock(productStock, data[data.length - 1].id), UrlParts.stocks).subscribe({
        next: () => this.productService.getAllData(UrlParts.products).subscribe(),
        error: err => console.log(`Error while adding data (${UrlParts.stocks}): ` + err),
        complete: () => console.log(`Post data complete (${UrlParts.stocks})`)
      })
    )
  }

}
