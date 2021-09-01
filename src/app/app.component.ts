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

    // TODO: try to move this logic to PROTECTED route
    this.socketioService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketioService.disconnectSocketConnection();
  }
}
