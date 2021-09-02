import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

// Services
import { ApiService } from 'src/app/api.service';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private apiService: ApiService,
    private socketioService: SocketioService
  ) {}

  ngOnInit() {
    this.apiService.getAccountInfo();
  }

  ngOnDestroy() {
    this.socketioService.disconnectSocketConnection();
  }
}
