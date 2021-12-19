import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '460px',
          minHeight: '300px',
          padding: '20px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          width: 0,
          height: 0,
          minHeight: 0,
          padding: 0,
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.2s ease-in-out')]),
      transition('closed => open', [animate('0.2s ease-in-out')]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  isOpen: boolean = false;

  @Output() handleChange = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') this.closeModal();
  }

  private handleOpenWindow(): void {
    this.isOpen = true;
  }

  private handleCloseWindow(): void {
    this.isOpen = false;
  }

  closeModal(): void {
    this.handleCloseWindow();

    setTimeout(() => {
      this.handleChange.emit();
    }, 300);
  }

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.handleOpenWindow();
    });
  }
}
