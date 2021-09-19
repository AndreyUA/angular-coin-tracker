import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { SocketioService } from './socketio.service';

// Store
import { Store } from '@ngrx/store';
import {
  setFamily,
  resetFamily,
  setFetching,
} from '../state/family/family.actions';
import {
  setAllBudgets,
  setCurrentBudget,
  addBudget,
  setIsFetching as setFetchingBudgets,
} from '../state/budgets/budgets.action';
import {
  setAllPosts,
  removePost,
  setFetching as setFetchingPosts,
} from '../state/posts/posts.actions';
import {
  setFetching as setFetchingTodos,
  setAllTodos,
} from '../state/todo/todo.actions';

// ENV
import { environment } from 'src/environments/environment';

// Interfaces
import { IFamily } from '../state/family/family.reducer';
import { IBudget, IBudgetInfo } from '../state/budgets/budgets.reducer';
import { IPost } from '../state/posts/posts.reducer';
import { ITodo } from '../state/todo/todo.reducer';

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
    this.store.dispatch(setFetching({ isFetching: true }));

    this.httpClient.get<IFamily>(`${environment.apiUrl}/api/login`).subscribe(
      (response) => {
        this.store.dispatch(setFetching({ isFetching: false }));
        this.store.dispatch(setFamily({ family: response }));

        this.socketioService.setupSocketConnection(response._id);
      },
      (error) => {
        this.store.dispatch(setFetching({ isFetching: false }));
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
    this.store.dispatch(setFetchingBudgets({ isFetching: true }));

    this.httpClient
      .get<Array<IBudgetInfo> | []>(`${environment.apiUrl}/api/budget/all`)
      .subscribe(
        (response) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));
          this.store.dispatch(setAllBudgets({ allBudgets: response }));
        },
        (error) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  getBudget(id: string): void {
    this.store.dispatch(setFetchingBudgets({ isFetching: true }));

    this.httpClient
      .get<IBudget | null>(`${environment.apiUrl}/api/budget/${id}`)
      .subscribe(
        (response) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));

          if (response) {
            this.store.dispatch(setCurrentBudget({ currentBudget: response }));
          } else {
            this.store.dispatch(setCurrentBudget({ currentBudget: {} }));
          }
        },
        (error) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));

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

          this.socketioService.createNewBudget(response.family, {
            id: response._id,
            name: response.name,
          });
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

            this.socketioService.createNewTransaction(
              response.family,
              response
            );
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
    this.store.dispatch(setFetchingPosts({ isFetching: true }));

    this.httpClient
      .get<Array<IPost>>(`${environment.apiUrl}/api/post/all`)
      .subscribe(
        (response) => {
          this.store.dispatch(setFetchingPosts({ isFetching: false }));

          this.store.dispatch(setAllPosts({ posts: response }));
        },
        (error) => {
          this.store.dispatch(setFetchingPosts({ isFetching: false }));

          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  deletePost(id: string) {
    this.httpClient
      .delete<IPost>(`${environment.apiUrl}/api/post/${id}`)
      .subscribe(
        (response) => {
          // TODO: dispath it to alerts in NgRx
          console.log(response);

          this.socketioService.deletePost(response.family, response._id);

          this.store.dispatch(removePost({ postId: response._id }));
        },
        (error) => {
          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }

  getAllTodos() {
    this.store.dispatch(setFetchingTodos({ isFetching: true }));

    this.httpClient
      .get<Array<ITodo>>(`${environment.apiUrl}/api/todo/all`)
      .subscribe(
        (response) => {
          this.store.dispatch(setFetchingTodos({ isFetching: false }));

          this.store.dispatch(setAllTodos({ todos: response }));
          // console.log(response);
        },
        (error) => {
          this.store.dispatch(setFetchingTodos({ isFetching: false }));

          this.store.dispatch(setAllTodos({ todos: [] }));

          // TODO: dispatch it to NgRx
          console.log(error);
        }
      );
  }
}
