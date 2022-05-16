import {Component, OnInit} from '@angular/core';
import {Product, Stock} from "../../models/product";
import {WebService} from "../../services/web.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
/**
 * Main product component, retrieves all existing products with delete function included
 */
export class ProductComponent implements OnInit {
  products!: Product[];
  stocks!: Stock[];
  urlPart : string = "products/";

  constructor(private productService: WebService<Product>,
              private stockService: WebService<Stock>) {
  }

  /**
   * Get all products on initialization
   */
  ngOnInit(): void {
    this.productService.getAllData(this.urlPart);
    this.products = this.productService.data;
    this.stockService.getAllData(this.urlPart);
    this.stocks = this.stockService.data;
  }

  /**
   * Delete product with given ID
   * @param id
   */
  deleteProduct(id: number) {
    this.productService.deleteData(id, this.urlPart);
  }
}

