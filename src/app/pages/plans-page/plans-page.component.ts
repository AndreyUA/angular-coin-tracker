import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { getTodos, getTodosIsFetching } from 'src/app/state/todo';
import { getFamily } from 'src/app/state/family';

// Services
import { ApiService } from 'src/app/services/api.service';
import { SocketioService } from 'src/app/services/socketio.service';

// Interfaces
import { ITodo } from 'src/app/state/todo/todo.reducer';
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

  isModalVisible: boolean = false;

  constructor(
    private store: Store,
    private apiService: ApiService,
    private socketioService: SocketioService
  ) {}

  private handleModal(bool: boolean): void {
    this.isModalVisible = bool;
  }

  openModal(): void {
    this.handleModal(true);
  }

  closeModal(): void {
    this.handleModal(false);
  }

  onSubmit(): void {
    this.closeModal();

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
      this.todos = todos.filter((todo: ITodo) => todo.isRemoved !== true);
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
