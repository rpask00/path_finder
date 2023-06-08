import {BehaviorSubject, combineLatest, debounceTime, Observable, Subscription} from "rxjs";
import {Filter, Pager, Sorter} from "./resource.service";

export abstract class DataSource<T> {

  protected _loading$ = new BehaviorSubject<boolean>(false);
  private _connections: Subscription[] = [];


  get loading$() {
    return this._loading$.asObservable();
  }

  protected _totalItems$ = new BehaviorSubject<number>(0);
  protected _expandedElement$ = new BehaviorSubject<T | null>(null);

  get expandedElement$(): Observable<T | null> {
    return this._expandedElement$.asObservable();
  }

  get totalItems$(): Observable<number> {
    return this._totalItems$.asObservable();
  }


  protected _data$ = new BehaviorSubject<T[]>([]);

  get data$() {
    return this._data$.asObservable();
  }

  pager$ = new BehaviorSubject<Pager>({
    page: 0,
    size: 10
  });

  filters$ = new BehaviorSubject<Filter>({});
  sorters$ = new BehaviorSubject<Sorter>({});


  connect() {
    this._connections.push(this.filters$.subscribe(() => {
      this.pager$.next({
        page: 0,
        size: this.pager$.value.size
      });
    }));

    this._connections.push(combineLatest([
      this.pager$,
      this.sorters$,
    ]).pipe(
      debounceTime(200),
    ).subscribe(() => this.loadData()));
  }

  disconnect() {
    this._connections.forEach(sub => sub.unsubscribe());
  }

  abstract loadData(): DataSource<T>;
}
