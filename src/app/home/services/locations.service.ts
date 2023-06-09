import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  forkJoin,
  merge,
  Observable,
  of,
  scan,
  shareReplay,
  startWith,
  Subject,
  tap
} from "rxjs";
import {FormControl} from "@angular/forms";
import {filter, map, switchMap} from "rxjs/operators";
import {LatLngExpression} from "leaflet";


export interface ILocation {
  description: string;
  structured_formatting: {
    main_text: string,
    secondary_text: string
  }
  place_id: string;
  reference: string;
  types: string[];
}

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

export type RouteResponse = Array<{
  vehicle_id: number,
  from: string,
  to: string,
  distance: number,
  waypoints: LatLngExpression[]
}>

@Injectable()
export class LocationsService {

  public searchControl = new FormControl();
  public removedLocation$ = new Subject<ILocation>();
  public autocompleteTypes$ = new BehaviorSubject<string[]>([])

  readonly driersColors = new Array(10).fill(0).map(() =>
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
  )

  public locations$: Observable<ILocation[]> = this.searchControl.valueChanges.pipe(
    startWith([]),
    debounceTime(500),
    switchMap((value) => {
      return typeof value === 'string' ? this.getLocations(value) : of([]);
    }),
  )

  public pickedLocations$: Observable<ILocation[]> = merge(
    this.searchControl.valueChanges.pipe(map(location => ({type: 'add', location}))),
    this.removedLocation$.pipe(map(location => ({type: 'remove', location})))
  ).pipe(
    filter(({location}) => location && typeof location === 'object'),
    scan((acc: ILocation[], {location, type}) => {
      return type === 'add' ? [...acc, location] : acc.filter(l => l.place_id !== location.place_id)
    }, []),
    tap(() => setTimeout(() => this.searchControl.reset())),
    startWith([]),
    shareReplay(1)
  )


  // TODO: cache the results of the requests
  public mapPoints$: Observable<LocationDetail[]> = this.pickedLocations$.pipe(
    map((locations) => locations.map(location => {
      return this._http.get(`${environment.apiUrl}places_details/` + location.place_id) as Observable<LocationDetail>
    })),
    switchMap((locations$: Observable<LocationDetail>[]) => forkJoin(locations$)),
    catchError(() => of([])),
    startWith([]),
  )

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$() {
    return this._loading$.asObservable();
  }

  public routeResponse$ = new BehaviorSubject<RouteResponse>([])


  constructor(
    private _http: HttpClient
  ) {
  }

  getLocations(value: string): Observable<ILocation[]> {
    const types = this.autocompleteTypes$.value.map(type => `type=${type}`).join('&')
    const request$ = this._http.get(`${environment.apiUrl}locations?search=${value}&${types}`) as Observable<ILocation[]>
    return request$.pipe(catchError(() => of([])))
  }

  vrp_solve(num_vehicles: number = 2) {
    this._loading$.next(true)
    this.pickedLocations$.pipe(
      switchMap((locations) => {
          let query = 'depot=0'
          query += `&num_vehicles=${num_vehicles}`
          query += `&${locations.map(l => `place_id=${l.place_id}`).join('&')}`
          return this._http.get(`${environment.apiUrl}vrp_solve?${query}`) as Observable<RouteResponse>
        }
      )).subscribe({
      next: (routeResponse) => {
        this._loading$.next(false)
        this.routeResponse$.next(routeResponse);
      },
      error: () => {
        this._loading$.next(false)
      }
    })
  }

}
