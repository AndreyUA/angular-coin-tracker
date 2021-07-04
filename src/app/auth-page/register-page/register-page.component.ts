import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements AfterViewInit {
  // This component is using template-driven form

  user = {
    familyName: '',
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('submit!');
    console.log(this.user);
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

      this.familyNameFocusRef.nativeElement.focus();
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
