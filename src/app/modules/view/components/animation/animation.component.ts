import { Component, AfterViewInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent,
} from '@angular/animations';

// Types
enum PositionsLeftAndRightTypes {
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
      transition('click => unclick', [animate('0.1s ease-in-out')]),
      transition('unclick => click', [animate('0.1s ease-in-out')]),
    ]),
    trigger('moveRightAndLeft', [
      state(
        PositionsLeftAndRightTypes.RIGHT,
        style({ marginLeft: '25px', transform: 'rotate(10deg)' })
      ),
      state(
        PositionsLeftAndRightTypes.LEFT,
        style({ marginRight: '50px', transform: 'rotate(-10deg)' })
      ),
      transition(
        `${PositionsLeftAndRightTypes.RIGHT} => ${PositionsLeftAndRightTypes.LEFT}`,
        [animate('1.2s ease-in-out')]
      ),
      transition(
        `${PositionsLeftAndRightTypes.LEFT} => ${PositionsLeftAndRightTypes.RIGHT}`,
        [animate('1.2s ease-in-out')]
      ),
    ]),
  ],
})
export class AnimationComponent implements AfterViewInit {
  isClicked: boolean = false;

  positionLeftAndRight: PositionsLeftAndRightTypes =
    PositionsLeftAndRightTypes.LEFT;

  private turnClickOn(): void {
    this.isClicked = true;
  }

  private turnClickOff(): void {
    this.isClicked = false;
  }

  private turnPositionToRight(): void {
    this.positionLeftAndRight = PositionsLeftAndRightTypes.RIGHT;
  }

  private turnPositionToLeft(): void {
    this.positionLeftAndRight = PositionsLeftAndRightTypes.LEFT;
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

  onAnimationLeftAndRightEnd(event: AnimationEvent): void {
    this.turnPositionToLeft();

    if (event.toState === PositionsLeftAndRightTypes.LEFT) {
      setTimeout(() => {
        this.turnPositionToRight();
      });
    }
  }

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.turnPositionToRight();
    });
  }
}
