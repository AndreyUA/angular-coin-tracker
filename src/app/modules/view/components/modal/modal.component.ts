import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() handleChange = new EventEmitter();

  closeModal(): void {
    this.handleChange.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}
