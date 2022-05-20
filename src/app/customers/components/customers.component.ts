import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/customer";
import {ApiService} from "../../services/api.service";
import {UrlParts} from "../../enums/urlParts";
import {LoginService} from "../../core/login/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers = new Array<Customer>();

  constructor(
              private customerService: ApiService<Customer>,
              public loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  /**
   * Get all customers from DB
   */
  getCustomers() {
    this.customerService.getAllData(UrlParts.customers).subscribe({
      next: data => {
        this.customers.splice(0, this.customers.length);
        data.forEach(c => this.customers.push(c));
      },
      error: err => console.log(`Error while getting data (${UrlParts.customers}): ` + err),
      complete: () => console.log(`Get all data complete (${UrlParts.customers})`)
    })
  }

  /**
   * Delete customer with given ID
   * @param id the customer ID
   */
  deleteCustomer(id: number) {
    this.customerService.deleteData(id, UrlParts.customers);
    this.router.navigate(['customers'])
  }
}
