import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import * as fromTransactions from "./transactions.reducer";

export interface State {
  transactions: fromTransactions.State;
}

export const reducers: ActionReducerMap<State> = {
  transactions: fromTransactions.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getTransactionState = createFeatureSelector<
  fromTransactions.State
>("transactions");

export const getTransactions = createSelector(
  getTransactionState,
  fromTransactions.getTransactions
);
