import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Transaction } from "../../interfaces/transaction.interface";

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<
  Transaction
>();

export const {
  selectEntities: selectTransactionsEntities,
  selectAll: selectAllTransactions
} = adapter.getSelectors();
