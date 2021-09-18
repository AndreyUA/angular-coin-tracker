import { Component, OnInit, Input } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import { finishTodo, deleteTodo } from 'src/app/state/todo/todo.actions';
import { getFamily } from 'src/app/state/family';

// Services
import { SocketioService } from 'src/app/services/socketio.service';

// Interfaces
import { ITodo } from 'src/app/state/todo/todo.reducer';
import { IFamily } from 'src/app/state/family/family.reducer';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ITodo;

  familyId!: string;

  constructor(private store: Store, private socketioService: SocketioService) {}

  finishTodoHandler(id: string) {
    this.store.dispatch(finishTodo({ todoId: id }));

    this.socketioService.changeTodoStatus(this.familyId, id);
  }

  deleteTodoHandler(id: string) {
    this.store.dispatch(deleteTodo({ todoId: id }));

    this.socketioService.deleteTodoStatus(this.familyId, id);
  }

  ngOnInit(): void {
    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      this.familyId = family._id;
    });
  }
}
