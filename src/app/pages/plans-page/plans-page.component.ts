import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ITodo {
  content: string;
  id?: string;
  isFinished?: boolean;
  isRemoved?: boolean;
}

const MOCK_TODO = [
  {
    content: 'Финики',
    id: '3123234534535423421',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Пюре Кирюне',
    id: '3123234534535423421',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Йогурт',
    id: '3123234534535423421',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Рис, гречка, булгур',
    id: '3123234534535423421',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Шоколадка',
    id: '3123234534535423421',
    isFinished: false,
    isRemoved: false,
  },
];

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.scss'],
})
export class PlansPageComponent implements OnInit {
  @ViewChild('todoInput', { static: false }) todoInput!: ElementRef;

  todos: Array<ITodo> = MOCK_TODO;

  todoForm!: FormGroup;

  constructor() {}

  onSubmit() {
    console.log(this.todoForm.value.todo);

    this.todos.unshift({ content: this.todoForm.value.todo })

    this.todoInput.nativeElement.blur();
    this.todoForm.reset();
  }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todo: new FormControl(null, Validators.required)
    })
  }
}
