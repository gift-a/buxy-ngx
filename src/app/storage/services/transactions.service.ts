import { Injectable } from "@angular/core";

import { DatabaseService } from "./database.service";
import { AbstractService } from "./abstract.service";

import { Transaction } from "../../interfaces/transaction.interface";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { fromPromise } from "rxjs/observable/fromPromise";

@Injectable()
export class TransactionsService extends AbstractService<Transaction> {
  constructor(db: DatabaseService) {
    super(db);
  }

  getDataType(): string {
    return "transactions";
  }
}

// @Injectable()
// export class TransactionsService {
//   constructor(private store: Store<Transaction[]>, private db: AngularFireDatabase) { }

//   get path() {
//     return `users/KlXthzAK0rP5YqLL5nemyNdQZZC2`;
//   }

//   getList<Transaction>(): Observable<Transaction[]> {
//     return this.db.list<Transaction>(`${this.path}/transactions`).valueChanges();
//   }

//   getData<Transaction>(dataId: string): Observable<Transaction> {
//     return this.db
//       .object<Transaction>(`${this.path}/transactions/${dataId}`)
//       .valueChanges();
//   }

//   setData(data: any): Observable<void> {
//     const dataToStore = Object.assign({}, data);
//     dataToStore.id = this.db.createPushId();
//     return fromPromise(
//       this.db.list(`${this.path}/transactions`).set(dataToStore.id, dataToStore)
//     );
//   }

//   updateData(data: any): Observable<void> {
//     return fromPromise(
//       this.db.list(`${this.path}/transactions`).update(data.id, data)
//     );
//   }

//   deleteData(dataId: string): Observable<void> {
//     return fromPromise(this.db.list(`${this.path}/transactions`).remove(dataId));
//   }

// }
