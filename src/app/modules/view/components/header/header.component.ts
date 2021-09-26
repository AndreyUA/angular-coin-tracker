import { Component, OnInit } from '@angular/core';

// Store
import { Store } from '@ngrx/store';
import { resetFamily } from 'src/app/state/family/family.actions';

// Services
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private socketioService: SocketioService) {}

  logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("person");
    localStorage.removeItem("budget");

    this.store.dispatch(resetFamily());
    this.socketioService.disconnectSocketConnection();
  }

  ngOnInit(): void {}
}
