import {Component, OnInit} from '@angular/core';
import {Product, Stock} from "../../../models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {UrlParts} from "../../../utils/urlParts";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
/**
 * Product component tu update an existing product's information
 */
export class ProductEditComponent implements OnInit {
  id!: number;
  product!: Product;
  stock!: Stock;
  angForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ApiService<Product>,
              private stockService: ApiService<Stock>,
              private formBuilder: FormBuilder) {
  }

  /**
   * Gets Product ID from uri to get product data
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct(this.id);
  }


  /**
   * Product edit form with validations constraints
   * @private
   */
  private createForm() {
    this.angForm = this.formBuilder.group({
      productName: [this.product.productName, [Validators.required, Validators.minLength(4)]],
      productDescription: [this.product.productDescription, [Validators.required, Validators.minLength(10)]],
      productPrice: [this.product.productPrice, Validators.required],
      productStock: [this.stock.qte, Validators.required]
    })
  }


  /**
   * Retrieve product data with given ID and initialize form with it
   * @param id
   */
  getProduct(id: number) {
    this.productService.getData(id, UrlParts.products).subscribe({
      next: data => {
        this.product = data;
        this.getStock(data.id)
      },
      error: err => console.log(`Error while getting data (${UrlParts.products}): ` + err),
      complete: () => console.log(`Get all data complete (${UrlParts.products})`)
    })
  }

  /**
   * Retrieve stock data with corresponding product ID
   * @param dataId
   */
  getStock(dataId: number) {
    this.stockService.getAllData(UrlParts.stocks).subscribe({
      next: stocks => stocks.map(s => {
        if(s.productId === dataId){
          this.stock = s
          this.createForm()
        }
      }),
      error: err => console.log(`Error while getting data (${UrlParts.products}): ` + err),
      complete: () => console.log(`Get all data complete (${UrlParts.products})`)
    })
  }

  /**
   * When form is submitted, new product info is updated in DB
   */
  onSubmit(): void {
    this.product.productName = this.formValue('productName');
    this.product.productDescription = this.formValue('productDescription');
    this.product.productPrice = this.formValue('productPrice');
    this.stock.qte = this.formValue('productStock');
    this.productService.updateData(this.product, UrlParts.products);
    this.stockService.updateData(this.stock, UrlParts.stocks);
    this.router.navigate(['']);
  }

  private formValue(controlName: string) {
    // @ts-ignore
    return this.angForm.get(controlName).value;
  }

}
