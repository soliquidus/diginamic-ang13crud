import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";

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
  visible = false;
  number = 0;

  constructor(private productService: ProductService<Product>) {
  }

  /**
   * Get all products on initialization
   */
  ngOnInit(): void {
    this.productService.getProducts();
    this.products = this.productService.products;
  }

  /**
   * Delete product with given ID
   * @param id
   */
  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

}
