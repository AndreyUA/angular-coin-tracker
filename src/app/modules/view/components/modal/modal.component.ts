import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // TODO: check animation
  @ViewChild('modalRef', { static: true }) private modalRef!: ElementRef;

  @Output() handleChange = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.renderer.removeClass(
      this.modalRef.nativeElement,
      'modal_wrapper-opened'
    );

    setTimeout(() => {
      this.handleChange.emit();
    }, 200);
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.renderer.addClass(
        this.modalRef.nativeElement,
        'modal_wrapper-opened'
      );
    });
  }
}
