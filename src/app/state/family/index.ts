import { IFamily } from './family.reducer';

export const getFamily = (state: any): IFamily => state.family.family;

export const getFamilyIsFetching = (state: any): boolean =>
  state.family.isFetching;
