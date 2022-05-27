import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./components/products.component";
import {ProductsAddComponent} from "./components/products-add/products-add.component";
import {ProductsEditComponent} from "./components/products-edit/products-edit.component";
import {LoginGuard} from "../core/services/login.guard";
import {ProductsResolver} from "./services/products.resolver";
import {StocksResolver} from "./services/stocks.resolver";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch:'full'},
  {path: 'products', component:ProductsComponent, resolve:{products: ProductsResolver, stocks: StocksResolver}},
  {path: 'products/create', component: ProductsAddComponent, canActivate: [LoginGuard]},
  {path: 'products/edit/:id', component: ProductsEditComponent, canActivate: [LoginGuard]},
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductsResolver, StocksResolver]
})
export class ProductsRoutingModule { }
