import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductAddComponent} from "./components/product/product-add/product-add.component";
import {ProductEditComponent} from "./components/product/product-edit/product-edit.component";
import {AppComponent} from "./app.component";
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  {path: "create", component: ProductAddComponent},
  {path: "edit/:id", component: ProductEditComponent},
  {path: "", component: ProductComponent},
  {path: "404", component:AppComponent},
  {path: "**", redirectTo:"/404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
