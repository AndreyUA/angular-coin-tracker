import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SnotifyService } from 'ng-snotify';

// Store
import { Store } from '@ngrx/store';
import { addNewPost, removePost } from 'src/app/state/posts/posts.actions';
import { updateTodoList } from 'src/app/state/todo/todo.actions';
import { addBudget } from 'src/app/state/budgets/budgets.action';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';
import { ITodo } from '../state/todo/todo.reducer';
import { IBudgetInfo } from '../state/budgets/budgets.reducer';

// Other
import { environment } from 'src/environments/environment';
import { notify } from '../utils/notification';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  constructor(private store: Store, private snotifyService: SnotifyService) {}

  // Connect for receiving socket's messages
  setupSocketConnection(familyId: string) {
    this.socket = io(environment.apiUrl);

    this.socket.emit('join_family_channel', familyId);

    this.socket.on('receivePost', (data: IPost) => {
      this.store.dispatch(addNewPost({ post: data }));

      this.snotifyService.success('New post created.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      notify('New post created.');
    });

    this.socket.on('receiveDeletedPost', (msgId: string) => {
      this.store.dispatch(removePost({ postId: msgId }));

      this.snotifyService.warning('Post removed.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      notify('Post removed.');
    });

    this.socket.on('updateTodos', (todo: ITodo) => {
      this.store.dispatch(updateTodoList({ todo }));

      this.snotifyService.success('Todo list updated.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      notify('Todo list updated.');
    });

    this.socket.on('receivedNewBudget', (budget: IBudgetInfo) => {
      this.store.dispatch(addBudget({ newBudget: budget }));

      this.snotifyService.success('Added new budget.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      notify('Added new budget.');
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

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
