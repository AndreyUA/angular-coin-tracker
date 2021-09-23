import { Action, createReducer, on } from '@ngrx/store';

import {
  setAllBudgets,
  setCurrentBudget,
  addBudget,
  setIsFetching,
} from './budgets.action';

export interface IBudget {
  _id: string;
  date: Date;
  family: string;
  isClosed: boolean;
  total: number;
  transactions: Array<ITransaction>;
  _v: number;
  name: string;
}

export interface IBudgetInfo {
  id: string;
  name: string;
}

export interface ITransaction {
  date: Date;
  money: number;
  person: string;
  purchase: string;
  _id: string;
}

export interface IBudgetState {
  allBudgets: Array<IBudgetInfo> | [];
  currentBudget: IBudget | {};
  isFetching: boolean;
}

const initialState: IBudgetState = {
  allBudgets: [],
  currentBudget: {},
  isFetching: false,
};

export const _budgetsReducer = createReducer(
  initialState,
  on(setAllBudgets, (state, { allBudgets }) => ({
    ...state,
    allBudgets,
  })),
  on(setIsFetching, (state, { isFetching }) => ({
    ...state,
    isFetching,
  })),
  on(setCurrentBudget, (state, { currentBudget }) => ({
    ...state,
    currentBudget,
  })),
  on(addBudget, (state, { newBudget }) => ({
    ...state,
    allBudgets: [...state.allBudgets, newBudget],
  }))
);

export function budgetsReducer(state: any, action: Action) {
  return _budgetsReducer(state, action);
}
