import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {Product} from "../model/product";
import {UrlParts} from "../../enums/urlParts";

/**
 * Resolver to get all existing products from DB
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {
  constructor(public productService: ApiService<Product>) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService.getAllData(UrlParts.products)
  }
}
