import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';

import { EmailValidator } from '../email-validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  // This component is using reactive form

  isPasswordVisible: boolean = false;

  constructor(private apiService: ApiService) {}

  passwordVisibilityToggler(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        EmailValidator.invalidEmail,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.apiService.loginFamily(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.loginForm.reset();
  }
}
