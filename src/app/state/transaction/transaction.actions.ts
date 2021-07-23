import { createAction, props } from '@ngrx/store';

import { ITransaction } from './transaction.reducer';

export const setAllTransactions = createAction(
  '[Transaction action] Set existing transactions',
  props<{ transactions: Array<ITransaction> }>()
);

export const addTransaction = createAction(
  '[Transaction action] Add transaction',
  props<{ transaction: ITransaction }>()
);
