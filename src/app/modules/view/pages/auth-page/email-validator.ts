import { FormControl } from '@angular/forms';

import { emailRegExp } from '../../../../utils/regexp';

export class EmailValidator {
  static invalidEmail(control: FormControl): { [s: string]: boolean } | null {
    if (emailRegExp.test(control.value)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }
}
