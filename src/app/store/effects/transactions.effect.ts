import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { TransactionsService } from "../../storage/services/transactions.service";
import * as fromTransactionsActions from "../actions/transactions.action";
import * as fromUserActions from "../actions/user.action";

import { User } from "../../interfaces/user.interface";

export type Action = fromTransactionsActions.Actions;

@Injectable()
export class TransactionsEffects {
  constructor(private actions: Actions, private db: TransactionsService) {}

  // @Effect()
  // loadAllTransactions: Observable<Action> = this.actions
  //   .ofType(fromTransactionsActions.Types.GET_ALL)
  //   .switchMap(() => this.db.getList())
  //   .map(
  //     transactions => new fromTransactionsActions.GetAllSuccess(transactions)
  //   );

  @Effect()
  loadOnUpdate: Observable<Action> = this.actions
    .ofType(fromUserActions.Types.AUTHENTICATED)
    .map((action: fromUserActions.Authenticated) => action.payload)
    .first()
    .switchMap((user: User) => this.db.getListUid(user.uid))
    .map(transactions => {
      console.log(transactions);
      return new fromTransactionsActions.GetAllSuccess(transactions);
    });

  @Effect()
  addTransaction: Observable<Action> = this.actions
    .ofType(fromTransactionsActions.Types.ADD_ONE)
    .map((action: fromTransactionsActions.AddOne) => action.payload)
    .switchMap(payload => this.db.setData(payload))
    .map(addedData => new fromTransactionsActions.AddOneSuccess(addedData));
}
