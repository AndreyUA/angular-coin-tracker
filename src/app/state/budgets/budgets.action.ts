import { createAction, props } from '@ngrx/store';

// Interfaces
import { IBudget, IBudgetInfo } from './budgets.reducer';

export const setAllBudgets = createAction(
  '[Budgets action] Set all budgets',
  props<{ allBudgets: Array<IBudgetInfo> }>()
);

export const addBudget = createAction(
  '[Budget action] Add new budget',
  props<{ newBudget: IBudgetInfo }>()
);

export const setCurrentBudget = createAction(
  '[Budgets action] Set current budget',
  props<{ currentBudget: IBudget | {} }>()
);
