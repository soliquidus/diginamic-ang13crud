import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductComponent} from "./product.component";
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

const route: Routes = [
  {path: "", component:ProductComponent},
  {path: "create", component: ProductAddComponent},
  {path: "edit/:id", component: ProductEditComponent},
  ]
@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProductModule { }
