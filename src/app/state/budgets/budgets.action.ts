import { createAction, props } from '@ngrx/store';

import { IBudget } from './budgets.reducer';

export const setAllBudgets = createAction(
  '[Budgets action] Set all budgets',
  props<{ allBudgets: Array<string> }>()
);

export const setCurrentBudget = createAction(
  '[Budgets action] Set current budget',
  props<{ currentBudget: IBudget }>()
);
