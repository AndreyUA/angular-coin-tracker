import { Action, createReducer, on } from '@ngrx/store';

import { setAllTransactions, addTransaction } from './transaction.actions';

export interface ITransaction {
  person: string;
  money: number;
  date: Date;
}

const initialState: Array<ITransaction> | [] = [];

export const _budgetReducer = createReducer(
  initialState,
  on(setAllTransactions, (state, { transactions }) => [
    ...state,
    ...transactions,
  ]),
  on(addTransaction, (state, { transaction }) => [transaction, ...state])
);

export function budgetReducer(state: any, action: Action) {
  return _budgetReducer(state, action);
}
