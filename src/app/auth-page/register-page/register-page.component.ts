import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  user = {
    familyName: '',
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('submit!');
    console.log(this.user);
  }
}
