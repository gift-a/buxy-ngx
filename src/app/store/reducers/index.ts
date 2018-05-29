import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { environment } from "../../../environments/environment.prod";

import * as fromUserReducer from "./user.reducer";
import * as fromTransactionsReducer from "./transactions.reducer";

export interface State {
  user: fromUserReducer.State;
  transactions: fromTransactionsReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUserReducer.reducer,
  transactions: fromTransactionsReducer.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    console.log("state", state);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
