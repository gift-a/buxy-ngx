import * as fromTransactionsActions from "../actions/transactions.action";
import { Transaction } from "../../interfaces/transaction.interface";

export type State = Transaction[];

export const initialState: State = [];

export function reducer(
  state: State = initialState,
  action: fromTransactionsActions.Actions
): State {
  switch (action.type) {
    case fromTransactionsActions.Types.GET_ALL_SUCCESS: {
      return action.payload;
    }

    case fromTransactionsActions.Types.ADD_ONE_SUCCESS: {
      return [...state, action.payload];
    }

    default:
      return state;
  }
}
