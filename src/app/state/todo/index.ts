import { ITodo } from './todo.reducer';

export const getTodos = (state: any): Array<ITodo> => state.todos.todos;

export const getTodosIsFetching = (state: any): boolean => state.todos.isFetching;
