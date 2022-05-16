import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

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
  angForm : any = FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ps: ProductService<Product>,
              private fb: FormBuilder) {
  }

  /**
   * User edit form with validations constraints
   * @private
   */
  private createForm() {
    this.angForm = this.fb.group({
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
    this.getUser(this.id);
  }

  /**
   * Retrieve product data with given ID and initialize form with it
   * @param id
   */
  getUser(id: number) {
    this.ps.getProduct(id).subscribe({
        next: data => {
          this.product = data;
          this.createForm();
        },
      error: err => console.log('Error while getting user: ' + err),
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
    this.ps.updateProduct(this.product);
    this.router.navigate([''])
  }

  private formValue(controlName: string) {
    return this.angForm.get(controlName).value;
  }

}
