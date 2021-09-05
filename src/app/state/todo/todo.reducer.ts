import { Action, createReducer, on } from '@ngrx/store';

import { setAllTodos, addNewTodo, setFetching } from './todo.actions';

// TODO: all fields are REQUIRED!!!
export interface ITodo {
  content: string;
  _id?: string;
  date?: string;
  isFinished?: boolean;
  isRemoved?: boolean;
}

export interface ITodos {
  todos: [] | Array<ITodo>;
  isFetching: boolean;
}

const initialState: ITodos = {
  todos: [],
  isFetching: false,
};

const _todosReducer = createReducer(
  initialState,
  on(setFetching, (state, { isFetching }) => ({
    ...state,
    isFetching,
  })),
  on(setAllTodos, (state, { todos }) => ({
    ...state,
    todos: todos,
  })),
  on(addNewTodo, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
  }))
);

export function todosReducer(state: any, action: Action) {
  return _todosReducer(state, action);
}
