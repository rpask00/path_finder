import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {
  catchError,
  debounceTime, firstValueFrom,
  forkJoin,
  merge,
  Observable,
  of, pairwise,
  scan,
  shareReplay,
  startWith,
  Subject,
  tap
} from "rxjs";
import {Location} from "../dashboard/locations/locations.component";
import {FormControl} from "@angular/forms";
import {filter, switchMap, map} from "rxjs/operators";

export interface LocationDetail {
  place_id: string,
  name: string,
  formatted_address: string,
  geometry: {
    location: {
      lat: number,
      lng: number
    }
  }
}

@Injectable()
export class LocationsService {

  public searchControl = new FormControl();
  public removedLocation$ = new Subject<Location>();


  public locations$: Observable<Location[]> = this.searchControl.valueChanges.pipe(
    startWith([]),
    debounceTime(500),
    switchMap((value) => {
      return typeof value === 'string' ? this.getLocations(value) : of([]);
    }),
  )

  public pickedLocations$ = merge(
    this.searchControl.valueChanges.pipe(map(location => ({type: 'add', location}))),
    this.removedLocation$.pipe(map(location => ({type: 'remove', location})))
  ).pipe(
    filter(({location}) => location && typeof location === 'object'),
    scan((acc: Location[], {location, type}) => {
      return type === 'add' ? [...acc, location] : acc.filter(l => l.place_id !== location.place_id)
    }, []),
    tap(() => setTimeout(() => this.searchControl.reset())),
    shareReplay(1)
  )


  // TODO: cache the results of the requests
  public mapPoints$: Observable<LocationDetail[]> = this.pickedLocations$.pipe(
    map((locations) => locations.map(location => {
      return this._http.get(`${environment.apiUrl}places_details/` + location.place_id) as Observable<LocationDetail>
    })),
    switchMap((locations$: Observable<LocationDetail>[]) => forkJoin(locations$)),
    catchError(() => of([])),
  )


  constructor(
    private _http: HttpClient
  ) {
  }

  getLocations(value: string): Observable<Location[]> {
    const request$ = this._http.get(`${environment.apiUrl}locations?search=${value}`) as Observable<Location[]>
    return request$.pipe(catchError(() => of([])))
  }

}
