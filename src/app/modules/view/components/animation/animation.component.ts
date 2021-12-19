import { Component, AfterViewInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent,
} from '@angular/animations';

enum PositionsType {
  LEFT = 'left',
  RIGHT = 'right',
}

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
    trigger('moveRightAndLeft', [
      state(PositionsType.RIGHT, style({ marginLeft: '20px' })),
      state(PositionsType.LEFT, style({ marginRight: '40px' })),
      transition(`${PositionsType.RIGHT} => ${PositionsType.LEFT}`, [
        animate('0.6s ease-in-out'),
      ]),
      transition(`${PositionsType.LEFT} => ${PositionsType.RIGHT}`, [
        animate('0.6s ease-in-out'),
      ]),
    ]),
  ],
})
export class AnimationComponent implements AfterViewInit {
  isClicked: boolean = false;

  position: string = PositionsType.LEFT;

  private turnPositionToRight(): void {
    this.position = PositionsType.RIGHT;
  }

  private turnPositionToLeft(): void {
    this.position = PositionsType.LEFT;
  }

  private turnClickOff(): void {
    this.isClicked = false;
  }

  private turnClickOn(): void {
    this.isClicked = true;
  }

  @HostListener('keydown', ['$event'])
  clickHandler(event: MouseEvent): void {
    if (event.type === 'mousedown') this.turnClickOn();
  }

  @HostListener('keyup', ['$event'])
  unclickHandler(event: MouseEvent): void {
    if (event.type === 'mouseup') this.turnClickOff();
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  handleTouch(event: Event): void {
    if (event.type === 'touchstart') this.turnClickOn();

    if (event.type === 'touchend') this.turnClickOff();
  }

  onAnimationEnd(event: AnimationEvent): void {
    this.turnPositionToLeft();

    if (event.toState === PositionsType.LEFT) {
      setTimeout(() => {
        this.turnPositionToRight();
      }, 0);
    }
  }

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.turnPositionToRight();
    }, 0);
  }
}
