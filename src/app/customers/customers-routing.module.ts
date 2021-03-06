import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from "./components/customers.component";
import {CustomersAddComponent} from "./components/customers-add/customers-add.component";
import {CustomersEditComponent} from "./components/customers-edit/customers-edit.component";
import {LoginGuard} from "../core/services/login.guard";
import {CustomersResolver} from "./services/customers.resolver";

const routes: Routes = [
  {path: '', component: CustomersComponent, resolve: {customers: CustomersResolver}, canActivate: [LoginGuard]},
  {path: 'create', component: CustomersAddComponent, canActivate: [LoginGuard]},
  {path: 'edit/:id', component: CustomersEditComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CustomersResolver]
})
export class CustomersRoutingModule {
}
