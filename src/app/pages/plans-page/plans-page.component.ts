import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { getTodos, getTodosIsFetching } from 'src/app/state/todo';
import { ITodo } from 'src/app/state/todo/todo.reducer';
import { setAllTodos, addNewTodo } from 'src/app/state/todo/todo.actions';

const MOCK_TODO = [
  {
    content: 'Финики',
    _id: '3123234534535423421',
    date: '1251851351561531',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Пюре Кирюне',
    _id: '3123234534535423421',
    date: '1251851351561531',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Йогурт',
    _id: '3123234534535423421',
    date: '1251851351561531',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Рис, гречка, булгур',
    _id: '3123234534535423421',
    date: '1251851351561531',
    isFinished: false,
    isRemoved: false,
  },
  {
    content: 'Шоколадка',
    _id: '3123234534535423421',
    date: '1251851351561531',
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

  isTodosFetching!: boolean;

  todos: Array<ITodo> = MOCK_TODO;

  todoForm!: FormGroup;

  constructor(private store: Store) {}

  onSubmit() {
    console.log(this.todoForm.value.todo);

    this.store.dispatch(
      addNewTodo({ todo: { content: this.todoForm.value.todo } })
    );

    this.todoInput.nativeElement.blur();
    this.todoForm.reset();
  }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todo: new FormControl(null, Validators.required),
    });

    this.store.dispatch(setAllTodos({ todos: MOCK_TODO }));

    this.store.pipe(select(getTodos)).subscribe((todos: Array<ITodo>) => {
      this.todos = todos;
    });

    this.store
      .pipe(select(getTodosIsFetching))
      .subscribe((isFetching: boolean) => {
        this.isTodosFetching = isFetching;
      });
  }
}
