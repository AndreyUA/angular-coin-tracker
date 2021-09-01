import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.apiUrl);

    this.socket.on('receivePost', (data: any) => {
      console.log(data);
    });
  }

  // TODO: add types
  sendPost(postBody: any) {
    this.socket.emit('sendPost', postBody);
  }

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
