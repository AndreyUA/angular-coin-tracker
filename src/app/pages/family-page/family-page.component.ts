import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { getFamily } from 'src/app/state/family';

// Services
import { ApiService } from 'src/app/api.service';

interface IPerson {
  _id: string;
  name: string;
  date: Date;
}
interface IFamily {
  familyName: string;
  persons: Array<IPerson>;
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

  constructor(private store: Store, private apiService: ApiService) {}

  onSubmitChangePersonHandler() {
    localStorage.setItem('person', this.changePersonForm.value.changePerson);
    console.log(this.changePersonForm.value.changePerson);
  }

  onSubmitAddPersonHandler() {
    this.apiService.addPersonToFamily(this.addPersonForm.value.addPerson);
    // this.family.persons?.push({ name: this.addPersonForm.value.addPerson });
    this.addPersonForm.reset();
  }

  ngOnInit(): void {
    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      this.family = family;
    });

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
