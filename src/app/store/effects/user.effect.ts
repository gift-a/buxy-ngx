import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { User } from "../../interfaces/user.interface";
import * as fromUserActions from "../actions/user.action";
import * as fromStore from "../index";

import { AuthService } from "../../auth/auth/auth.service";
import { Observable } from "rxjs/Observable";
import { defer } from "rxjs/observable/defer";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";

export type Action = fromUserActions.Actions;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private auth: AuthService,
    private store: Store<fromStore.State>
  ) {}

  @Effect()
  getUser: Observable<Action> = this.actions
    .ofType(fromUserActions.Types.GET_USER)
    .switchMap(() => this.auth.authState())
    .map(authData => {
      if (authData) {
        const user: User = {
          uid: authData.uid,
          displayName: authData.displayName
        };
        console.log(user.uid);
        return new fromUserActions.Authenticated(user);
      } else {
        return new fromUserActions.NotAuthenticated();
      }
    })
    .catch(e => Observable.of(new fromUserActions.AuthError({ error: e })));

  @Effect()
  loginWithGoogle: Observable<Action> = this.actions
    .ofType(fromUserActions.Types.GOOGLE_LOGIN)
    .switchMap(payload => Observable.fromPromise(this.auth.signInWithGoogle()))
    .map(credential => new fromUserActions.GetUser())
    .catch(e => Observable.of(new fromUserActions.AuthError({ error: e })));

  @Effect()
  logout: Observable<Action> = this.actions
    .ofType(fromUserActions.Types.LOGOUT)
    .switchMap(() => Observable.fromPromise(this.auth.logout()))
    .map(() => new fromUserActions.NotAuthenticated())
    .catch(e => Observable.of(new fromUserActions.AuthError({ error: e })));

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => {
    this.store.dispatch(new fromUserActions.GetUser());
  });
}
