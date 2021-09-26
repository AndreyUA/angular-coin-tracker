import { Component, OnInit } from '@angular/core';

// Store
import { Store } from '@ngrx/store';
import { resetFamily } from 'src/app/state/family/family.actions';

// Services
import { SocketioService } from 'src/app/services/socketio.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store,
    private socketioService: SocketioService,
    private themeService: ThemeService
  ) {}

  logoutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('person');
    localStorage.removeItem('budget');

    this.store.dispatch(resetFamily());
    this.socketioService.disconnectSocketConnection();
  }

  setDarkTheme() {
    this.themeService.setDarkTheme();
  }

  setLightTheme() {
    this.themeService.setLightTheme();
  }

  ngOnInit(): void {
    this.themeService.setDefaultTheme();
  }
}
