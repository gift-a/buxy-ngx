import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import * as fromTransactions from "./transactions.reducer";

export interface ContentState {
  transactions: fromTransactions.TransactionsState;
}

export const reducers: ActionReducerMap<ContentState> = {
  transactions: fromTransactions.reducer
};

export const initialContentState: ContentState = {
  transactions: fromTransactions.initialState
};

//????????????????
export const getContentState = createFeatureSelector<ContentState>(
  "ContentState"
);

export const getTransactionsState = createSelector(
  getContentState,
  (state: ContentState) => state.transactions
);

export const getTransactions = createSelector(
  getTransactionsState,
  fromTransactions.getTransactions
);

export const getTransactionsLoading = createSelector(
  getTransactionsState,
  fromTransactions.getTransactionsLoading
);

export const getTransactionsIsLoaded = createSelector(
  getTransactionsState,
  fromTransactions.getTransactionsIsLoaded
);

// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//   return function(state: State, action: any): State {
//     console.log("state", state);
//     console.log("action", action);
//     return reducer(state, action);
//   };
// }

// export const metaReducers: MetaReducer<State>[] = [logger];
