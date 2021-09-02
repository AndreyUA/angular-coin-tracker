import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  constructor() {}

  setupSocketConnection(familyId: string) {
    this.socket = io(environment.apiUrl);

    this.socket.emit('join_family_channel', familyId)

    this.socket.on('receivePost', (data: any) => {
      // TODO: put it on UI
      console.log(data);
    });
  }

  // TODO: add types
  sendPost(familyId: string, postBody: any) {
    this.socket.emit('sendPost', familyId, postBody);
  }

  disconnectSocketConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
