import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

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
          // TODO: dispatch it to NgRx
          console.log(response);
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
          // TODO: dispatch it to NgRx
          console.log(response);
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }
}
