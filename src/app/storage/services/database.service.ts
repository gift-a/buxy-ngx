import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

import { AuthService } from "../../auth/auth/auth.service";

@Injectable()
export class DatabaseService {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  get path() {
    return `users/${this.auth.currentUser.uid}`;
  }

  getList<T>(dataType: string): Observable<T[]> {
    return this.db.list<T>(`${this.path}/${dataType}`).valueChanges();
  }

  getListUid<T>(uid: string, dataType: string): Observable<T[]> {
    return this.db.list<T>(`users/${uid}/${dataType}`).valueChanges();
  }

  getData<T>(dataType: string, dataId: string): Observable<T> {
    return this.db
      .object<T>(`${this.path}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData<T>(dataType: string, data: T): Observable<T> {
    const dataToStore = Object.assign({ id: "" }, data);
    dataToStore.id = this.db.createPushId();
    return fromPromise(
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
