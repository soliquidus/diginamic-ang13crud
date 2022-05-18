import {Component, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username!: string;
  password!: string;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    this.username = this.formValue('username');
    this.password = this.formValue('password');
    this.validate();
    this.router.navigate([''])
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [this.username, [Validators.required, Validators.minLength(5)]],
      password: [this.password, [Validators.required, Validators.minLength(5)]]
    })
  }

  validate() {
    this.loginService.loginFilter(this.username, this.password);
  }

  private formValue(controlName: string) {
    // @ts-ignore
    return this.loginForm.get(controlName).value;
  }
}
