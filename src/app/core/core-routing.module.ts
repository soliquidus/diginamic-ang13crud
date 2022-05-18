import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "../app.component";
import {LoginComponent} from "./login/components/login.component";

const routes: Routes = [
  {path: "", loadChildren: () => import('../products/products.module')
      .then(m => m.ProductsModule)},
  {path: "login", component: LoginComponent},
  {path: "404", component:AppComponent},
  {path: "**", redirectTo:"/404"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
