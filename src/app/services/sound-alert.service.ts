import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class SoundAlertService {
  constructor() {}

  playSoundAlert() {
    const alert = new Howl({
      src: ['../../assets/sound/sound_notification.mp3'],
      volume: 1,
      autoplay: true,
      loop: false,
    });

    alert.play();
  }
}
