import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import * as fromTransactionsReducer from "./transactions.reducer";
import * as fromTransactionsAdapter from "./transactions.adapter";
import * as fromUserReducer from "./user.reducer";
import { environment } from "../../../environments/environment";

export interface State {
  user: fromUserReducer.State;
  transactions: fromTransactionsReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUserReducer.reducer,
  transactions: fromTransactionsReducer.reducer
};

export const getContentState = (state: State) => state;

export const getTransactionsState = createSelector(
  getContentState,
  (state: State) => state.transactions
);

// export const getTransactions = createSelector(
//   getTransactionsState,
//   fromTransactionsReducer.getTransactions
// );

// export const getTransactionsLoading = createSelector(
//   getTransactionsState,
//   fromTransactionsReducer.getTransactionsLoading
// );

// export const getTransactionsIsLoaded = createSelector(
//   getTransactionsState,
//   fromTransactionsReducer.getTransactionsIsLoaded
// );

export const selectTransactionsEntities = createSelector(
  getTransactionsState,
  fromTransactionsAdapter.selectTransactionsEntities
);

export const selectAllTransactions = createSelector(
  getTransactionsState,
  fromTransactionsAdapter.selectAllTransactions
);

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
