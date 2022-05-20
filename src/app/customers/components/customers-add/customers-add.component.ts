import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Customer} from "../../model/customer";
import {UrlParts} from "../../../enums/urlParts";

@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.css']
})
/**
 * Customer component to manage new Customers
 */
export class CustomersAddComponent implements OnInit {
  cForm!: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private customerService: ApiService<Customer>) {
  }

  /**
   * Initialize form at start
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * When submitted a new customer is created and then we're redirected to customers main page.
   */
  onSubmit(): void {
    let customerData = this.cForm.value
    this.addCustomer(customerData.firstName, customerData.lastName, customerData.email)
    this.router.navigate(['customers'])
  }

  /**
   * Customer creation form with validations constraints
   * @private
   */
  private createForm() {
    this.cForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  /**
   * Add a customer to DB
   * @param firstName the customer first name
   * @param lastName the customer last name
   * @param email the customer email
   */
  addCustomer(firstName: string, lastName: string, email: string) {
    let customer = new Customer(firstName, lastName, email);
    this.customerService.addData(customer, UrlParts.customers).subscribe({
      next: data => console.log(data),
      error: err => console.log(`Error while posting data (${UrlParts.customers}): ` + err),
      complete: () => console.log(`Post data complete (${UrlParts.customers})`)
    })
  }
}
