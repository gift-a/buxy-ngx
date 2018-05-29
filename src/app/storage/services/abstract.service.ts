import { DatabaseService } from "./database.service";
import { Observable } from "rxjs/Observable";

export abstract class AbstractService<T> {
  constructor(private db: DatabaseService) {}

  abstract getDataType(): string;

  getList(): Observable<T[]> {
    return this.db.getList<T>(this.getDataType());
  }

  getListUid(uid: string): Observable<T[]> {
    return this.db.getListUid<T>(uid, this.getDataType());
  }

  getData(dataId: string): Observable<T> {
    return this.db.getData<T>(this.getDataType(), dataId);
  }

  setData(data: T): Observable<T> {
    return this.db.setData<T>(this.getDataType(), data);
  }

  updateData(data: T): Observable<void> {
    return this.db.updateData(this.getDataType(), data);
  }

  deleteData(dataId: string): Observable<void> {
    return this.db.deleteData(this.getDataType(), dataId);
  }
}
