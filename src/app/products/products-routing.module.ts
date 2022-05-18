import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./components/products.component";
import {ProductsAddComponent} from "./components/products-add/products-add.component";
import {ProductsEditComponent} from "./components/products-edit/products-edit.component";
import {LoginGuard} from "../core/services/login.guard";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch:'full'},
  {path: 'products', component:ProductsComponent},
  {path: 'create', component: ProductsAddComponent, canActivate: [LoginGuard]},
  {path: 'edit/:id', component: ProductsEditComponent},
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
