import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

// Store
import { Store } from '@ngrx/store';
import { addNewPost } from 'src/app/state/posts/posts.actions';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  constructor(private store: Store) {}

  setupSocketConnection(familyId: string) {
    this.socket = io(environment.apiUrl);

    this.socket.emit('join_family_channel', familyId);


    this.socket.on('receivePost', (data: IPost) => {
      this.store.dispatch(addNewPost({ post: data }));
    });
  }

  // TODO: add types
  sendPost(familyId: string, postBody: { text: string; name: string }) {
    this.socket.emit('sendPost', familyId, postBody);
  }

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
