import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import { TransactionsService } from "../../storage/services/transactions.service";
import * as transactionsActions from "../actions/transactions.actions";

export type Action = transactionsActions.Action;

@Injectable()
export class TransactionsEffects {
  constructor(private actions: Actions, private db: TransactionsService) {}

  // @Effect()
  // getTransactions: Observable<Action> = this.actions.ofType(transactionsActions.GET_ALL)
  //   .map((action: transactionsActions.GetAll) => action.payload)
  //   .delay(2000)
  //   .mergeMap(payload => {
  //     console.log(payload)
  //     return payload;
  //   }
  //   )
  //   .map(payload => {
  //     return new transactionsActions.GetAll(payload)
  //   });

  @Effect()
  addTransaction: Observable<Action> = this.actions
    .ofType(transactionsActions.ADD_ONE)
    .map((action: transactionsActions.AddOne) => action.payload)
    .mergeMap(payload => {
      this.db.setData(payload);
      return payload;
    })
    .mergeMap(payload => new transactionsActions.AddOne(payload));
}
