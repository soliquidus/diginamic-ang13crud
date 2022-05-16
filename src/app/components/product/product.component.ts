import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
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

  constructor(private ps: ProductService<Product>) {
  }

  /**
   * Get all products on initialization
   */
  ngOnInit(): void {
    this.ps.getProducts();
    this.products = this.ps.products;
  }

  /**
   * Delete product with given ID
   * @param id
   */
  deleteProduct(id: number) {
    this.ps.deleteProduct(id);
  }

}
