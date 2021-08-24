import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Store
import { Store } from '@ngrx/store';
import { setFamily, resetFamily } from './state/family/family.actions';
import { IFamily } from './state/family/family.reducer';

// ENV
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ family: IFamily } | {}>
  ) {}

  // TODO: add family interface OR error interface
  getAccountInfo() {
    this.store.dispatch(resetFamily());

    this.httpClient.get<any>(`${environment.apiUrl}/api/login`).subscribe(
      (response) => {
        this.store.dispatch(setFamily({ family: response }));
      },
      (error) => {
        // TODO: dispatch it to NgRx
        console.log(error);
      }
    );
  }

  createNewFamily(familyName: string, email: string, password: string) {
    const newFamily = {
      familyName,
      email,
      password,
    };

    this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/api/register`, newFamily)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);

          this.getAccountInfo();
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  loginFamily(email: string, password: string) {
    const family = {
      email,
      password,
    };

    this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/api/login`, family)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);

          this.getAccountInfo();
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  addPersonToFamily(name: string) {
    const newPerson = {
      name,
    };

    this.httpClient
      .patch<IFamily>(`${environment.apiUrl}/api/family`, newPerson)
      .subscribe(
        (response) => {
          this.store.dispatch(setFamily({ family: response }));
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  getAllBudgets() {
    this.httpClient.get(`${environment.apiUrl}/api/budget/all`)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
