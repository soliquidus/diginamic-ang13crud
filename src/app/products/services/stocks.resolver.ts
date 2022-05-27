import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Stock} from "../model/product";
import {ApiService} from "../../services/api.service";
import {UrlParts} from "../../enums/urlParts";

/**
 * Resolver to get all existing stocks from DB
 */
@Injectable({
  providedIn: 'root'
})
export class StocksResolver implements Resolve<any> {
  constructor(public stockService: ApiService<Stock>) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.stockService.getAllData(UrlParts.stocks);
  }
}
