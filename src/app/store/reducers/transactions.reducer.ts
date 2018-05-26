import { Action } from "@ngrx/store";
import * as fromTransactions from "../actions/transactions.action";

import { Transaction } from "../../interfaces/transaction.interface";

export interface TransactionsState {
  data: Transaction[];
  isLoaded: boolean;
  loading: boolean;
}
export const initialState: TransactionsState = {
  data: [],
  isLoaded: false,
  loading: false
};

export function reducer(
  state: TransactionsState = initialState,
  action: fromTransactions.Actions
): TransactionsState {
  console.log(state, action.type);

  switch (action.type) {
    case fromTransactions.GET_ALL: {
      return {
        ...state,
        loading: true
      };
    }

    case fromTransactions.GET_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoaded: true
      };
    }

    case fromTransactions.ADD_ONE_SUCCESS: {
      const newTransaction: Transaction = action.payload;
      const newState = {
        ...state,
        data: [...state.data, newTransaction]
      };
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
}

export const getTransactionsLoading = (state: TransactionsState) =>
  state.loading;
export const getTransactionsIsLoaded = (state: TransactionsState) =>
  state.isLoaded;
export const getTransactions = (state: TransactionsState) => state.data;
