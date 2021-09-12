import { Action, createReducer, on } from '@ngrx/store';

import {
  setAllTodos,
  addNewTodo,
  setFetching,
  finishTodo,
  deleteTodo,
  updateTodoList,
} from './todo.actions';

// TODO: all fields are REQUIRED!!!
export interface ITodo {
  content: string;
  family?: string;
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
  // TODO: remove it and use setAllTodos
  on(addNewTodo, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
  })),
  // TODO: remove it and use setAllTodos
  on(finishTodo, (state, { todoId }) => {
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
  // TODO: remove it and use setAllTodos
  on(deleteTodo, (state, { todoId }) => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo._id !== todoId),
    };
  }),
  on(updateTodoList, (state, { todo }) => {
    const todoListClone: Array<ITodo> = [...state.todos];
    const updateIndex: number = todoListClone.findIndex(
      (todoItem) => todoItem._id === todo._id
    );

    if (updateIndex > -1) {
      todoListClone[updateIndex] = todo;
    } else {
      todoListClone.unshift(todo);
    }

    return {
      ...state,
      todos: todoListClone,
    };
  })
);

export function todosReducer(state: any, action: Action) {
  return _todosReducer(state, action);
}
