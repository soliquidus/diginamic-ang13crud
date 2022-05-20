import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Customer} from "../../model/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UrlParts} from "../../../enums/urlParts";

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
/**
 * Customer component to update an existing customer
 */
export class CustomersEditComponent implements OnInit {
  id!: number;
  customer!: Customer;
  cForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customerService: ApiService<Customer>,
              private formBuilder: FormBuilder) { }

  /**
   * Gets Customer ID from uri to get customer data
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCustomer(this.id);
  }

  /**
   * When form is submitted, new customer info is updated in DB
   */
  onSubmit(): void {
    this.customer.firstName = this.formValue('firstName');
    this.customer.lastName = this.formValue('lastName');
    this.customer.email = this.formValue('email');
    this.customerService.updateData(this.customer, UrlParts.customers);
    this.router.navigate(['customers']);
  }

  /**
   * Customer edit form with validations constraints
   * @private
   */
  private createForm() {
    this.cForm = this.formBuilder.group({
      firstName: [this.customer.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.customer.lastName, [Validators.required, Validators.minLength(3)]],
      email: [this.customer.email, [Validators.required, Validators.email]]
    })
  }

  /**
   * Retrieve customer data with given ID and initialize form with it
   * @param id the customer ID
   */
  getCustomer(id: number){
    this.customerService.getData(id, UrlParts.customers).subscribe({
      next: data => {
        this.customer = data;
        this.createForm();
      },
      error: err => console.log(`Error while getting data (${UrlParts.customers}): ` + err),
      complete: () => console.log(`Get all data complete (${UrlParts.customers})`)
    })
  }

  /**
   * Gets the value of a given form control name
   * @param controlName the formControlName
   * @private
   */
  private formValue(controlName: string) {
    // @ts-ignore
    return this.angForm.get(controlName).value;
  }

}
