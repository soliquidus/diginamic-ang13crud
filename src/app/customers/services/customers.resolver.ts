import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {Customer} from "../model/customer";
import {UrlParts} from "../../enums/urlParts";

/**
 * Resolver to get all existing customers from DB
 */
@Injectable({
  providedIn: 'root'
})
export class CustomersResolver implements Resolve<any> {
  constructor(private customerService: ApiService<Customer>) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.customerService.getAllData(UrlParts.customers);
  }
}
