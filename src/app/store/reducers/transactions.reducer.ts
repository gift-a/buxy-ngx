import { Action } from "@ngrx/store";
import * as transactionAction from "../actions/transactions.actions";

import { Transaction } from "../../interfaces/transaction.interface";

export interface State {
  transactions: Transaction[];
}

export const initialState: State = {
  transactions: []
};

export function reducer(
  state: State = initialState,
  action: transactionAction.Action
) {
  console.log(state, action.type);

  switch (action.type) {
    case transactionAction.ADD_ONE: {
      const newTransaction: Transaction = action.payload;
      const newState = {
        ...state,
        transactions: [...state.transactions, newTransaction]
      };
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
}

export const getTransactions = (state: State) => state.transactions;
