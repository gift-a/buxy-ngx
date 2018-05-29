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
export class MainGuard implements CanActivate {
  constructor(
    private router: Router,
    private _firebaseAuth: AngularFireAuth,
    private store: Store<fromStore.State>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._firebaseAuth.authState.map(item => {
      if (item) {
        return true;
      } else {
        this.router.navigate([""]);
        return false;
      }
    });
  }
}
