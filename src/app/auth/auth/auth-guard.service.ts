import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as fromStore from "../../store";
import * as fromUserActions from "../../store/actions/user.action";
import { Store } from "@ngrx/store";
import { User } from "../../interfaces/user.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  user$: Observable<User>;
  constructor(
    private router: Router,
    private _firebaseAuth: AngularFireAuth,
    private store: Store<fromStore.State>
  ) {
    this.user$ = this.store.select("user");
    // this.store.dispatch(new fromUserActions.GetUser());
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user$.map(user => {
      if (user && user.uid) {
        this.router.navigate(["main"]);
        return false;
      } else {
        return true;
      }
    });
  }
}
