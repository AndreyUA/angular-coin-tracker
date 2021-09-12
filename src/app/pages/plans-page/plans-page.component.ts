import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { getTodos, getTodosIsFetching } from 'src/app/state/todo';
import { ITodo } from 'src/app/state/todo/todo.reducer';
import {
  setAllTodos,
  addNewTodo,
  finishTodo,
  deleteTodo,
} from 'src/app/state/todo/todo.actions';
import { getFamily } from 'src/app/state/family';

// Services
import { ApiService } from 'src/app/api.service';
import { SocketioService } from 'src/app/socketio.service';

// Interfaces
import { IFamily } from 'src/app/state/family/family.reducer';

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.scss'],
})
export class PlansPageComponent implements OnInit {
  @ViewChild('todoInput', { static: false }) todoInput!: ElementRef;

  isTodosFetching!: boolean;

  todos: Array<ITodo> | [] = [];

  todoForm!: FormGroup;

  familyId!: string;

  constructor(
    private store: Store,
    private apiService: ApiService,
    private socketioService: SocketioService
  ) {}

  finishTodoHandler(id: string) {
    this.store.dispatch(finishTodo({ todoId: id }));
  }

  deleteTodoHandler(id: string) {
    this.store.dispatch(deleteTodo({ todoId: id }));
  }

  onSubmit() {
    this.socketioService.updateTodosList(this.familyId, {
      content: this.todoForm.value.todo,
    });

    this.todoInput.nativeElement.blur();
    this.todoForm.reset();

    this.apiService.getAllTodos();
  }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todo: new FormControl(null, Validators.required),
    });

    this.apiService.getAllTodos();

    this.store.pipe(select(getTodos)).subscribe((todos: Array<ITodo>) => {
      this.todos = todos;
    });

    this.store
      .pipe(select(getTodosIsFetching))
      .subscribe((isFetching: boolean) => {
        this.isTodosFetching = isFetching;
      });

    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      this.familyId = family._id;
    });
  }
}
