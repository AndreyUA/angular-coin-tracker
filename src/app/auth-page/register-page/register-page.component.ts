import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements AfterViewInit {
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

    setTimeout(() => {
      this.typing();
    }, 100);
  }

  ngAfterViewInit() {
    this.typing();
  }
}
