import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { environment } from "../../../environments/environment.prod";

import * as fromUserReducer from "./user.reducer";

export interface State {
  user: fromUserReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUserReducer.reducer
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
