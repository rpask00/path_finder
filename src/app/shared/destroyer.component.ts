import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({template: ''})
export class DestroyerComponent implements OnDestroy {
  private _destroy$ = new Subject<null>();

  get destroyed$() {
    return this._destroy$.asObservable();
  }

  constructor() {}

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  filtered(observable: Observable<any>) {
    return observable.pipe(
      takeUntil(this.destroyed$),
      filter((value) => value !== null)
    );
  }
}
