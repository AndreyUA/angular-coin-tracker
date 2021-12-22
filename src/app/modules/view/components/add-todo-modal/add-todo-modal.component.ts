import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss'],
})
export class AddTodoModalComponent implements AfterViewInit {
  @ViewChild('todoInput', { static: false }) todoInput!: ElementRef;

  @Input() todoForm!: FormGroup;

  @Output() submitForm = new EventEmitter();

  public submitHandler(): void {
    this.todoInput.nativeElement.blur();

    this.submitForm.emit();
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.todoInput.nativeElement.focus();
  }
}
