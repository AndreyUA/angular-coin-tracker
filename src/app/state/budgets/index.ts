import { IBudget, IBudgetInfo } from './budgets.reducer';

export const getArrayOfBudgets = (state: any): Array<IBudgetInfo> =>
  state.budgets.allBudgets;

export const getCurrentBudget = (state: any): IBudget =>
  state.budgets.currentBudget;

export const getBudgetIsFetching = (state: any): boolean =>
  state.budgets.isFetching;
