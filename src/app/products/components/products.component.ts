import {Component, OnInit} from '@angular/core';
import {Product, Stock} from "../model/product";
import {ApiService} from "../../services/api.service";
import {UrlParts} from "../../enums/urlParts";
import {LoginService} from "../../core/login/service/login.service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private route: ActivatedRoute,
              private productService: ApiService<Product>,
              private stockService: ApiService<Stock>,
              public loginService: LoginService,
              private router: Router) {
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
    this.router.navigate([''])
  }

  /**
   * Get all products from resolver
   */
  getProducts() {
    this.route.data.subscribe(
      {
        next: data => this.products = data['products'],
        error: err => console.log(`Error while getting data (${UrlParts.products}): ` + err),
        complete: () => console.log(`Get all data complete (${UrlParts.products})`)
      }
    );
  }

  /**
   * Gets all stocks available from resolver
   */
  getStocks() {
    this.route.data.subscribe(
      {
        next: data => this.stocks = data['stocks'],
        error: err => console.log(`Error while getting data (${UrlParts.stocks}): ` + err),
        complete: () => console.log(`Get all data complete (${UrlParts.stocks})`)
      }
    );
  }
}

