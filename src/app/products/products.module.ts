import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductsComponent} from "./components/products.component";
import {ProductsAddComponent} from "./components/products-add/products-add.component";
import {ProductsEditComponent} from "./components/products-edit/products-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductsRoutingModule} from "./products-routing.module";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsAddComponent,
    ProductsEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {}
