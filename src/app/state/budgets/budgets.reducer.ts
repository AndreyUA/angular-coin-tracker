import { Action, createReducer, on } from '@ngrx/store';

import { setAllBudgets, setCurrentBudget, addBudget } from './budgets.action';

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

const initialState: {
  allBudgets: Array<IBudgetInfo> | [];
  currentBudget: IBudget | {};
} = {
  allBudgets: [],
  currentBudget: {},
};

export const _budgetsReducer = createReducer(
  initialState,
  on(setAllBudgets, (state, { allBudgets }) => ({
    ...state,
    allBudgets,
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
