import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { SocketioService } from './socketio.service';

// Store
import { Store } from '@ngrx/store';
import { setFamily, resetFamily } from './state/family/family.actions';
import {
  setAllBudgets,
  setCurrentBudget,
  addBudget,
} from './state/budgets/budgets.action';
import {
  setAllPosts,
  resetPosts,
  addNewPost,
  removePost,
} from './state/posts/posts.actions';

// ENV
import { environment } from 'src/environments/environment';

// Interfaces
import { IFamily } from './state/family/family.reducer';
import { IBudget, IBudgetInfo } from './state/budgets/budgets.reducer';
import { IPost } from './state/posts/posts.reducer';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ family: IFamily } | {}>,
    private socketioService: SocketioService
  ) {}

  // TODO: add family interface OR error interface
  getAccountInfo(): void {
    this.store.dispatch(resetFamily());

    this.httpClient.get<IFamily>(`${environment.apiUrl}/api/login`).subscribe(
      (response) => {
        this.store.dispatch(setFamily({ family: response }));

        this.socketioService.setupSocketConnection(response._id);
      },
      (error) => {
        // TODO: dispatch it to NgRx
        console.log(error);
      }
    );
  }

  createNewFamily(familyName: string, email: string, password: string): void {
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

  loginFamily(email: string, password: string): void {
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

  addPersonToFamily(name: string): void {
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

  getAllBudgets(): void {
    this.httpClient
      .get<Array<IBudgetInfo> | []>(`${environment.apiUrl}/api/budget/all`)
      .subscribe(
        (response) => {
          this.store.dispatch(setAllBudgets({ allBudgets: response }));
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  getBudget(id: string): void {
    this.httpClient
      .get<IBudget | null>(`${environment.apiUrl}/api/budget/${id}`)
      .subscribe(
        (response) => {
          if (response) {
            this.store.dispatch(setCurrentBudget({ currentBudget: response }));
          } else {
            this.store.dispatch(setCurrentBudget({ currentBudget: {} }));
          }
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);

          this.store.dispatch(setCurrentBudget({ currentBudget: {} }));
        }
      );
  }

  createNewBudget(name: string, total: number): void {
    const newBudget = {
      name,
      total,
    };

    this.httpClient
      .post<IBudget>(`${environment.apiUrl}/api/budget`, newBudget)
      .subscribe(
        (response) => {
          this.store.dispatch(
            addBudget({
              newBudget: {
                id: response._id,
                name: response.name,
              },
            })
          );
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  addNewTransAction(id: string, name: string, money: number, purchase: string) {
    this.httpClient
      .patch<IBudget>(`${environment.apiUrl}/api/budget/${id}`, {
        name,
        money,
        purchase,
      })
      .subscribe(
        (response) => {
          if (response) {
            this.store.dispatch(setCurrentBudget({ currentBudget: response }));
          } else {
            this.store.dispatch(setCurrentBudget({ currentBudget: {} }));
          }
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);

          this.store.dispatch(setCurrentBudget({ currentBudget: {} }));
        }
      );
  }

  getAllposts() {
    this.store.dispatch(resetPosts());

    this.httpClient
      .get<Array<IPost>>(`${environment.apiUrl}/api/post/all`)
      .subscribe(
        (response) => {
          this.store.dispatch(setAllPosts({ posts: response }));
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  deletePost(id: string) {
    this.httpClient
      .delete<{ msg: string }>(`${environment.apiUrl}/api/post/${id}`)
      .subscribe(
        (response) => {
          // TODO: dispath it to alerts in NgRx
          console.log(response);

          this.store.dispatch(removePost({ postId: id }));
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }
}
