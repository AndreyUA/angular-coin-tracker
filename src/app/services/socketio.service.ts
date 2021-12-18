import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

// Store
import { Store, select } from '@ngrx/store';
import { addNewPost, removePost } from 'src/app/state/posts/posts.actions';
import { updateTodoList } from 'src/app/state/todo/todo.actions';
import {
  addBudget,
  setCurrentBudget,
} from 'src/app/state/budgets/budgets.action';
import { getCurrentBudget } from 'src/app/state/budgets';

// Services
import { NotificationService } from './notification.service';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';
import { ITodo } from '../state/todo/todo.reducer';
import { IBudgetInfo, IBudget } from '../state/budgets/budgets.reducer';

// Other
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  currentBudget!: IBudget;

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  // Connect for receiving socket's messages
  setupSocketConnection(familyId: string) {
    this.socket = io(environment.apiUrl);

    this.socket.emit('join_family_channel', familyId);

    this.socket.on('receivePost', (data: IPost) => {
      this.store.dispatch(addNewPost({ post: data }));

      this.notificationService.successMessage('New post created.');
    });

    this.socket.on('receiveDeletedPost', (msgId: string) => {
      this.store.dispatch(removePost({ postId: msgId }));

      this.notificationService.warningMessage('Post removed.');
    });

    this.socket.on('updateTodos', (todo: ITodo) => {
      this.store.dispatch(updateTodoList({ todo }));

      this.notificationService.successMessage('Todo list updated.');
    });

    this.socket.on('receivedNewBudget', (budget: IBudgetInfo) => {
      this.store.dispatch(addBudget({ newBudget: budget }));

      this.notificationService.successMessage('Added new budget.');
    });

    this.socket.on('receivedNewTransaction', (socketBudget: IBudget) => {
      this.store.pipe(select(getCurrentBudget)).subscribe((budget: IBudget) => {
        this.currentBudget = budget;
      });

      if (this.currentBudget._id === socketBudget._id) {
        this.store.dispatch(setCurrentBudget({ currentBudget: socketBudget }));
      }

      this.notificationService.successMessage('Added new transaction.');
    });
  }

  sendPost(familyId: string, postBody: { text: string; name: string }) {
    this.socket.emit('sendPost', familyId, postBody);
  }

  deletePost(familyId: string, msgId: string) {
    this.socket.emit('removePost', familyId, msgId);
  }

  updateTodosList(familyId: string, todo: ITodo) {
    this.socket.emit('updateTodosList', familyId, todo);
  }

  changeTodoStatus(familyId: string, todoId: string) {
    this.socket.emit('changeTodoStatus', familyId, todoId);
  }

  deleteTodoStatus(familyId: string, todoId: string) {
    this.socket.emit('deleteTodoStatus', familyId, todoId);
  }

  createNewBudget(familyId: string, newBudget: IBudgetInfo) {
    this.socket.emit('createNewBudget', familyId, newBudget);
  }

  createNewTransaction(familyId: string, budget: IBudget) {
    this.socket.emit('createNewTransaction', familyId, budget);
  }

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
