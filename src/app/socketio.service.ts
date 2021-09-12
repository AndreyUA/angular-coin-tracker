import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SnotifyService } from 'ng-snotify';

// Store
import { Store } from '@ngrx/store';
import { addNewPost, removePost } from 'src/app/state/posts/posts.actions';
import { updateTodoList } from './state/todo/todo.actions';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';
import { ITodo } from './state/todo/todo.reducer';

// Other
import { environment } from 'src/environments/environment';
import { notify } from './utils/notification';

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
      notify('New post created.');

      this.snotifyService.success('New post created.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      this.store.dispatch(addNewPost({ post: data }));
    });

    this.socket.on('receiveDeletedPost', (msgId: string) => {
      notify('Post removed.');

      this.snotifyService.warning('Post removed.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      this.store.dispatch(removePost({ postId: msgId }));
    });

    this.socket.on('updateTodos', (todo: ITodo) => {
      notify('Todo list updated.');

      this.snotifyService.success('Todo list updated.', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      this.store.dispatch(updateTodoList({ todo }));
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

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
