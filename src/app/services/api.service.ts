import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Services
import { SocketioService } from './socketio.service';
import { NotificationService } from './notification.service';

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

type IErrorsArrayItem = {
  msg: string;
};

interface IErrorsArray {
  errors: Array<IErrorsArrayItem>;
}

interface IError extends HttpErrorResponse {
  error: IErrorsArray;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ family: IFamily } | {}>,
    private socketioService: SocketioService,
    private notificationService: NotificationService
  ) {}

  showErrorMessage(error: IError, alertText: string): void {
    error.error.errors.forEach((errorObj) =>
      this.notificationService.errorMessage(alertText, errorObj.msg)
    );
  }

  getAccountInfo(): void {
    this.store.dispatch(resetFamily());
    this.store.dispatch(setFetching({ isFetching: true }));

    this.httpClient.get<IFamily>(`${environment.apiUrl}/api/login`).subscribe(
      (response) => {
        this.store.dispatch(setFetching({ isFetching: false }));
        this.store.dispatch(setFamily({ family: response }));

        this.socketioService.setupSocketConnection(response._id);
      },
      (error: IError) => {
        this.store.dispatch(setFetching({ isFetching: false }));

        this.showErrorMessage(error, 'Authorization failed.');
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
        (error: IError) => {
          this.showErrorMessage(error, 'Registration failed.');
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
        (error: IError) => {
          this.showErrorMessage(error, 'Authorization failed.');
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
        (error: IError) => {
          this.showErrorMessage(error, 'Creating failed.');
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
        (error: IError) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));

          this.showErrorMessage(error, 'Error.');
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
        (error: IError) => {
          this.store.dispatch(setFetchingBudgets({ isFetching: false }));

          this.showErrorMessage(error, 'Error.');

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
        (error: IError) => {
          this.showErrorMessage(error, 'Creating failed.');
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
        (error: IError) => {
          this.store.dispatch(setCurrentBudget({ currentBudget: {} }));

          this.showErrorMessage(error, 'Creating failed.');
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
        (error: IError) => {
          this.store.dispatch(setFetchingPosts({ isFetching: false }));

          this.showErrorMessage(error, 'Error.');
        }
      );
  }

  deletePost(id: string) {
    this.httpClient
      .delete<IPost>(`${environment.apiUrl}/api/post/${id}`)
      .subscribe(
        (response) => {
          this.notificationService.warningMessage('Post removed.');

          this.socketioService.deletePost(response.family, response._id);

          this.store.dispatch(removePost({ postId: response._id }));
        },
        (error: IError) => {
          this.showErrorMessage(error, 'Error.');
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
        },
        (error: IError) => {
          this.store.dispatch(setFetchingTodos({ isFetching: false }));

          this.store.dispatch(setAllTodos({ todos: [] }));

          this.showErrorMessage(error, 'Error.');
        }
      );
  }
}
