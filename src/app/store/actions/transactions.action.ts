import { Action } from "@ngrx/store";
import { Transaction } from "../../interfaces/transaction.interface";

export const GET_ALL = "[Transactions] Get all";
export const GET_ALL_SUCCESS = "[Transactions] Get all success";
export const ADD_ONE = "[Transactions] Add One";
export const ADD_ONE_SUCCESS = "[Transactions] Add one success";

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public payload: Transaction) {}
}

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: Transaction) {}
}

export class AddOneSuccess implements Action {
  readonly type = ADD_ONE_SUCCESS;
  constructor(public payload: Transaction) {}
}

export type Actions = AddOne | AddOneSuccess | GetAll | GetAllSuccess;
