import { Action, createReducer, on } from '@ngrx/store';

import {
  setAllTodos,
  addNewTodo,
  setFetching,
  finishTodo,
  deleteTodo,
} from './todo.actions';

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
  })),
  on(finishTodo, (state, { todoId }) => {
    // TODO: make it simple!
    const newTodosArray = state.todos.map(
      (todo: ITodo, index: number): ITodo => {
        if (todo._id === todoId) {
          const clone = { ...todo };
          clone.isFinished = !state.todos[index].isFinished;

          return clone;
        }

        return todo;
      }
    );

    return {
      ...state,
      todos: [...newTodosArray],
    };
  }),
  on(deleteTodo, (state, { todoId }) => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo._id !== todoId),
    };
  })
);

export function todosReducer(state: any, action: Action) {
  return _todosReducer(state, action);
}
