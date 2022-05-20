import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersAddComponent } from './components/customers-add/customers-add.component';
import { CustomersEditComponent } from './components/customers-edit/customers-edit.component';
import {CustomersComponent} from "./components/customers.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CustomersComponent,
    CustomersAddComponent,
    CustomersEditComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CustomersModule { }
