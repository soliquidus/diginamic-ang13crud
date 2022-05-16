import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WebService} from "../../../services/web.service";

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
  urlPart:string = "products/"
  product!: Product;
  angForm : any = FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: WebService<Product>,
              private formBuilder: FormBuilder) {
  }

  /**
   * Product edit form with validations constraints
   * @private
   */
  private createForm() {
    this.angForm = this.formBuilder.group({
      productName: [this.product.productName, [Validators.required, Validators.minLength(4)]],
      productDescription: [this.product.productDescription, [Validators.required, Validators.minLength(10)]],
      productPrice: [this.product.productPrice, Validators.required]
    })
  }
/**
   * Gets Product ID from uri to get product data
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct(this.id);
  }

  /**
   * Retrieve product data with given ID and initialize form with it
   * @param id
   */
  getProduct(id: number) {
    this.productService.getData(id, this.urlPart).subscribe({
        next: data => {
          this.product = data;
          this.createForm();
        },
      error: err => console.log('Error while getting product: ' + err),
      complete: () => console.log("Get Product complete")
      })
  }

  /**
   * When form is submitted, new product info is updated in DB
   */
  onSubmit(): void {
    this.product.productName = this.formValue('productName');
    this.product.productDescription = this.formValue('productDescription');
    this.product.productPrice = this.formValue('productPrice');
    this.productService.updateData(this.product, this.urlPart);
    this.router.navigate([''])
  }

  private formValue(controlName: string) {
    return this.angForm.get(controlName).value;
  }

}
