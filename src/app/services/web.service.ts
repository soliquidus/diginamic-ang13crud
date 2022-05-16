import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Model} from "../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Main service for API calls for different objects
 */
export class WebService<T extends Model> {

  data = new Array<T>();

  constructor(private http: HttpClient) {
  }

  /**
   * Gets data from all abjects from given type and stocks it in an array
   * @param urlPart
   */
  getAllData(urlPart: string): void {
    this.http.get<T[]>(`${environment.gateway + urlPart}`).subscribe(
      {
        next: data => {
          this.data.splice(0, this.data.length);
          data.forEach(p => this.data.push(p));
        },
        error: err => console.log('Error while getting products: ' + err),
        complete: () => console.log('Get all data complete')
      }
    );
  }

  /**
   * Adds a new object of given type
   * @param p
   * @param urlPart
   */
  addData(p: T, urlPart: string): void {
    p.id = 0;
    this.http.post(`${environment.gateway + urlPart}`, p).subscribe({
      next: () => this.getAllData(urlPart),
      error: err => console.log('Error while adding product: ' + err),
      complete: () => console.log('Add product complete')
    });
  }

  /**
   * Get data from specified object of given type with ID
   * @param id
   * @param urlPart
   */
  getData(id: number, urlPart: string) {
    return this.http.get<T>(`${environment.gateway + urlPart + id}`)
  }

  /**
   * Update data of specified object of given type with ID
   * @param p
   * @param urlPart
   */
  updateData(p: T, urlPart: string) {
    this.http.put<T>(`${environment.gateway + urlPart + p.id}`, p).subscribe({
      next: () => this.getAllData(urlPart),
      error: err => console.log('Error while updating product: ' + err),
      complete: () => console.log('Update data complete')
    })
  }

  /**
   * Removes specified object of given type with ID
   * @param id
   * @param urlPart
   */
  deleteData(id: number, urlPart: string): void {
    this.http.delete<T>(`${environment.gateway + urlPart + id}`).subscribe({
      next: () => this.getAllData(urlPart),
      error: err => console.log('Error while removing data: ' + err),
      complete: () => console.log('Delete data complete')
    })
  }
}
