import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

import { AuthService } from "../../auth/auth/auth.service";

import * as fromStore from "../../store";
import * as fromUserActions from "../../store/actions/user.action";
import { Store } from "@ngrx/store";
import { User } from "../../interfaces/user.interface";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/filter";

@Injectable()
export class DatabaseService {
  user$: Observable<User>;
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private store: Store<fromStore.State>
  ) {
    this.user$ = this.store.select("user");
    this.store.dispatch(new fromUserActions.GetUser());
  }

  get path() {
    return `users/${this.auth.currentUser.uid}`;
  }

  getList<T>(dataType: string): Observable<T[]> {
    console.log("db getList " + dataType);
    return this.user$
      .filter(user => !!(user && user.uid))
      .mergeMap(user =>
        this.db.list<T>(`users/${user.uid}/${dataType}`).valueChanges()
      );
  }

  getData<T>(dataType: string, dataId: string): Observable<T> {
    return this.db
      .object<T>(`${this.path}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData<T>(dataType: string, data: any): Observable<T> {
    const dataToStore = Object.assign({}, data);
    dataToStore.id = this.db.createPushId();
    return fromPromise<T>(
      this.db
        .list(`${this.path}/${dataType}`)
        .set(dataToStore.id, dataToStore)
        .then(() => dataToStore)
    );
  }

  updateData(dataType: string, data: any): Observable<void> {
    return fromPromise(
      this.db.list(`${this.path}/${dataType}`).update(data.id, data)
    );
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    return fromPromise(this.db.list(`${this.path}/${dataType}`).remove(dataId));
  }
}
