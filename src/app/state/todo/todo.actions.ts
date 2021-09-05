import { createAction, props } from '@ngrx/store';

// Interfaces
import { ITodo } from './todo.reducer';

export const setFetching = createAction(
  '[Todos action] Set todos fetching',
  props<{ isFetching: boolean }>()
);

export const setAllTodos = createAction(
  '[Todos action] Set all todos',
  props<{ todos: Array<ITodo> }>()
);

export const addNewTodo = createAction(
  '[Todos action] Add new todo',
  props<{ todo: ITodo }>()
);
