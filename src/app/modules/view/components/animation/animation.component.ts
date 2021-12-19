import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('clickUnclick', [
      state(
        'unclick',
        style({
          marginTop: '0',
        })
      ),
      state(
        'click',
        style({
          marginTop: '20px',
        })
      ),
      transition('click => unclick', [animate('0.2s ease-in-out')]),
      transition('unclick => click', [animate('0.2s ease-in-out')]),
    ]),
  ],
})
export class AnimationComponent {
  isClicked: boolean = false;

  private turnClickOff() {
    this.isClicked = false;
  }

  private turnClickOn() {
    this.isClicked = true;
  }

  @HostListener('keydown', ['$event'])
  clickHandler(event: MouseEvent) {
    if (event.type === 'mousedown') this.turnClickOn();
  }

  @HostListener('keyup', ['$event'])
  unclickHandler(event: MouseEvent) {
    if (event.type === 'mouseup') this.turnClickOff();
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  handleTouch(event: Event) {
    if (event.type === 'touchstart') this.turnClickOn();

    if (event.type === 'touchend') this.turnClickOff();
  }

  constructor() {}
}
