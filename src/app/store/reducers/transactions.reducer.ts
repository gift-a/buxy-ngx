import { EntityState } from "@ngrx/entity";
import * as fromTransactionsActions from "../actions/transactions.action";
import * as fromTransactionsAdapter from "./transactions.adapter";

import { Transaction } from "../../interfaces/transaction.interface";

export interface State extends EntityState<Transaction> {}

export const initialState: State = fromTransactionsAdapter.adapter.getInitialState();

export function reducer(
  state: State = initialState,
  action: fromTransactionsActions.Actions
): State {
  switch (action.type) {
    case fromTransactionsActions.Types.GET_ALL_SUCCESS: {
      return fromTransactionsAdapter.adapter.addAll(action.payload, state);
    }

    case fromTransactionsActions.Types.ADD_ONE_SUCCESS: {
      return fromTransactionsAdapter.adapter.addOne(action.payload, state);
    }

    default:
      return state;
  }
}

// export const getTransactions = (state: State) => state;
