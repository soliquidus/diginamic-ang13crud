import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Model} from "../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService<T extends Model> {

  products = new Array<T>();

  constructor(private http: HttpClient) {
  }

  getProducts(): void {
    this.http.get<T[]>(environment.gateway).subscribe(
      {
        next: data => {
          this.products.splice(0, this.products.length);
          data.forEach(p => this.products.push(p));
        },
        error: err => console.log('Error while getting products: ' + err),
        complete: () => console.log('Get Products complete')
      }
    );
  }

  addProduct(p: T): void {
    p.id = 0;
    this.http.post(`${environment.gateway}`, p).subscribe({
      next: () => this.getProducts(),
      error: err => console.log('Error while adding product: ' + err),
      complete: () => console.log('Add product complete')
    });
  }

  getProduct(id: number) {
    return this.http.get<T>(`${environment.gateway + '/' + id}`)
  }

  updateProduct(p: T) {
    this.http.put<T>(`${environment.gateway + '/' + p.id}`, p).subscribe({
      next: () => this.getProducts(),
      error: err => console.log('Error while updating product: ' + err),
      complete: () => console.log('Update Product complete')
    })
  }

  deleteProduct(id: number): void {
    this.http.delete<T>(`${environment.gateway + '/' + id}`).subscribe({
      next: () => this.getProducts(),
      error: err => console.log('Error while removing product: ' + err),
      complete: () => console.log('Delete Product complete')
    })
  }
}
