import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snotifyService: SnotifyService) {}

  successMessage(msg: string): void {
    this.snotifyService.success(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  infoMessage(msg: string): void {
    this.snotifyService.info(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  errorMessage(msg: string, error?: string): void {
    this.snotifyService.error(`${msg} ${error ? error : ''}`, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  warningMessage(msg: string): void {
    this.snotifyService.warning(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
}
