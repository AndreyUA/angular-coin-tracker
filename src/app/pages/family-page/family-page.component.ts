import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

const MOCK_FAMILY1 = {
  familyName: 'Andrusha, Olusha, Kirusha TEST1',
  persons: [],
};

const MOCK_FAMILY2 = {
  familyName: 'Andrusha, Olusha, Kirusha TEST2',
  persons: [
    {
      name: 'Папа',
    },
    {
      name: 'Мама',
    },
  ],
};

interface IPerson {
  name: string;
}
interface IFamily {
  familyName: string;
  persons?: Array<IPerson>;
}
@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss'],
})
export class FamilyPageComponent implements OnInit {
  family!: IFamily;

  addPersonForm!: FormGroup;

  changePersonForm!: FormGroup;

  constructor() {}

  onSubmitChangePersonHandler() {
    localStorage.setItem('person', this.changePersonForm.value.changePerson);
    console.log(this.changePersonForm.value.changePerson);
  }

  onSubmitAddPersonHandler() {
    this.family.persons?.push({ name: this.addPersonForm.value.addPerson });
    this.addPersonForm.reset();
  }

  ngOnInit(): void {
    this.family = MOCK_FAMILY2;

    this.addPersonForm = new FormGroup({
      addPerson: new FormControl(null, Validators.required),
    });

    if (localStorage.getItem('person')) {
      this.changePersonForm = new FormGroup({
        changePerson: new FormControl(localStorage.getItem('person')),
      });
    } else {
      this.changePersonForm = new FormGroup({
        changePerson: new FormControl('default'),
      });
    }
  }
}
