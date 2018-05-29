import { Action } from "@ngrx/store";
import { Transaction } from "../../interfaces/transaction.interface";

export enum Types {
  GET_ALL = "[Transactions] Get all",
  GET_ALL_SUCCESS = "[Transactions] Get all success",
  ADD_ONE = "[Transactions] Add One",
  ADD_ONE_SUCCESS = "[Transactions] Add one success"
}

export class GetAll implements Action {
  readonly type = Types.GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = Types.GET_ALL_SUCCESS;
  constructor(public payload: Transaction[]) {}
}

export class AddOne implements Action {
  readonly type = Types.ADD_ONE;
  constructor(public payload: Transaction) {}
}

export class AddOneSuccess implements Action {
  readonly type = Types.ADD_ONE_SUCCESS;
  constructor(public payload: Transaction) {}
}

export type Actions = GetAll | GetAllSuccess | AddOne | AddOneSuccess;
