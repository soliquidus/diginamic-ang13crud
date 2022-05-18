import {Component, OnInit} from '@angular/core';
import {Product, Stock} from "../model/product";
import {ApiService} from "../../services/api.service";
import {UrlParts} from "../../utils/urlParts";
import {LoginService} from "../../core/login/service/login.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
/**
 * Main product component, retrieves all existing products with delete function included
 */
export class ProductsComponent implements OnInit {
  products = new Array<Product>();
  stocks = new Array<Stock>();

  constructor(private productService: ApiService<Product>,
              private stockService: ApiService<Stock>,
              public loginService: LoginService) {
  }

  /**
   * Get all products with it stocks on initialization
   */
  ngOnInit(): void {
    this.getProducts()
    this.getStocks()
  }

  /**
   * Delete product with given ID (and its stocks)
   * @param id
   */
  deleteProduct(id: number) {
    this.productService.deleteData(id, UrlParts.products);
  }

  /**
   * Get all products from DB
   */
  getProducts() {
    this.productService.getAllData(UrlParts.products).subscribe(
      {
        next: data => {
          this.products.splice(0, this.products.length);
          data.forEach(p => this.products.push(p));
        },
        error: err => console.log(`Error while getting data (${UrlParts.products}): ` + err),
        complete: () => console.log(`Get all data complete (${UrlParts.products})`)
      }
    );
  }

  /**
   * Gets all stocks available in DB
   */
  getStocks() {
    this.stockService.getAllData(UrlParts.stocks).subscribe(
      {
        next: data => {
          this.stocks.splice(0, this.stocks.length);
          data.forEach(p => this.stocks.push(p));
        },
        error: err => console.log(`Error while getting data (${UrlParts.stocks}): ` + err),
        complete: () => console.log(`Get all data complete (${UrlParts.stocks})`)
      }
    );
  }
}

