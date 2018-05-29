import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth/auth.service";
import { User } from "../../interfaces/user.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import * as fromUserActions from "../../store/actions/user.action";
import * as fromTransactionsActions from "../../store/actions/transactions.action";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-layout",
  template: `<app-drawer *ngIf="user$ | async"></app-drawer>`
})
export class LayoutComponent {
  user$: Observable<User>;
  constructor(
    private auth: AuthService,
    private store: Store<fromStore.State>
  ) {
    this.user$ = this.store.select("user");
    this.user$
      .filter(user => !!user)
      .first()
      .subscribe(user => {
        if (user && user.uid) {
          console.log(user);
          new fromTransactionsActions.GetAll();
        }
      });
  }

  get uid(): Observable<string> {
    return this.store
      .select("user")
      .filter(user => !!user)
      .map(user => user.uid);
  }
}
