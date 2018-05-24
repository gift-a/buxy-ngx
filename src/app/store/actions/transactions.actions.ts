import { Action } from "@ngrx/store";
import { Transaction } from "../../interfaces/transaction.interface";

// export const GET_ALL = "[Transactions] Get all";
// export const GET_ALL_SUCCESS = "[Transactions] Get all success";
export const ADD_ONE = "[Transactions] Add One";

// export class GetAll implements Action {
//   readonly type = GET_ALL;
//   constructor(public payload: string) { }
// }

// export class GetAllSuccess implements Action {
//   readonly type = GET_ALL_SUCCESS;
//   constructor(public payload: Transaction) { }
// }

export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: Transaction) {}
}

export type Action = AddOne;
// | GetAll
// | GetAllSuccess
