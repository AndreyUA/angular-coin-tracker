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

export const finishTodo = createAction(
  '[Todos action] Finish todo',
  props<{ todoId: string }>()
);

export const deleteTodo = createAction(
  '[Todos action] Delete todo',
  props<{ todoId: string }>()
);

export const updateTodoList = createAction(
  '[Todos action] Update todo by socket message',
  props<{ todo: ITodo }>()
);
