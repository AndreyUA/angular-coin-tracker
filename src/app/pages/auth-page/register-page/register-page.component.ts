import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements AfterViewInit {
  // This component is using template-driven form

  isPasswordVisible: boolean = false;

  constructor(private apiService: ApiService) {}

  passwordVisibilityToggler(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  user = {
    familyName: '',
    email: '',
    password: '',
  };

  onSubmit() {
    this.apiService.createNewFamily(
      this.user.familyName,
      this.user.email,
      this.user.password
    );
  }

  // Typing features
  @ViewChild('wellcome') wellcomeRef!: ElementRef;
  @ViewChild('familyNameFocus') familyNameFocusRef!: ElementRef;

  wellcomeText: string = 'Wellcome to Coin Tracker!';
  typingText!: string;
  counterTyping: number = 0;

  typing(): void {
    this.counterTyping++;

    if (this.counterTyping === this.wellcomeText.length + 1) {
      this.wellcomeRef.nativeElement.innerHTML = this.typingText;

      return;
    }

    this.typingText = this.wellcomeText.slice(0, this.counterTyping);
    this.wellcomeRef.nativeElement.innerHTML = this.typingText + '|';

    let timeOut: number = 100;

    if (this.counterTyping % 2 === 0) timeOut = 200;
    if (this.counterTyping % 3 === 0) timeOut = 300;

    setTimeout(() => {
      this.typing();
    }, timeOut);
  }

  ngAfterViewInit() {
    this.typing();
  }
}
