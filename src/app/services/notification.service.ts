import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

// Services
import { SoundAlertService } from './sound-alert.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snotifyService: SnotifyService,
    private soundAlertService: SoundAlertService
  ) {}

  successMessage(msg: string): void {
    this.snotifyService.success(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    this.soundAlertService.playSoundAlert();
  }

  infoMessage(msg: string): void {
    this.snotifyService.info(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    this.soundAlertService.playSoundAlert();
  }

  errorMessage(msg: string, error?: string): void {
    this.snotifyService.error(`${msg} ${error ? error : ''}`, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    this.soundAlertService.playSoundAlert();
  }

  warningMessage(msg: string): void {
    this.snotifyService.warning(msg, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    this.soundAlertService.playSoundAlert();
  }
}
