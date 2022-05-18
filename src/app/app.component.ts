import { Component } from '@angular/core';
import {LoginService} from "./core/login/service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 13 CRUD with Clean Architecture';
  constructor(public loginService: LoginService) {
  }
}
