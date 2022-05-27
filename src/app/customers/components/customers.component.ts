import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {UrlParts} from "../../enums/urlParts";
import {LoginService} from "../../core/login/service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers = new Array<Customer>();

  constructor(private route: ActivatedRoute,
              private customerService: ApiService<Customer>,
              public loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  /**
   * Get all customers from resolver
   */
  getCustomers() {
    this.route.data.subscribe({
      next: data => this.customers = data['customers'],
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
