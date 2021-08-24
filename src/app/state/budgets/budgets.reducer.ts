import { Action, createReducer, on } from '@ngrx/store';

import { setAllBudgets, setCurrentBudget } from './budgets.action';

export interface IBudget {
  _id: string;
  date: Date;
  family: string;
  isClosed: boolean;
  total: number;
  transactions: Array<ITransaction>;
  _v: number;
}

export interface IBudgetInfo {
  id: string;
  name: string;
}

export interface ITransaction {
  date: Date;
  money: number;
  person: string;
  _id: string;
}

const initialState:
  | {}
  | {
      allBudgets: Array<string>;
      currentBudget: IBudget | {};
    } = {};

export const _budgetsReducer = createReducer(
  initialState,
  on(setAllBudgets, (state, { allBudgets }) => ({
    ...state,
    allBudgets,
  })),
  on(setCurrentBudget, (state, { currentBudget }) => ({
    ...state,
    currentBudget,
  }))
);

export function budgetsReducer(state: any, action: Action) {
  return _budgetsReducer(state, action);
}
