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
import {Location} from "../dashboard/locations/locations.component";
import {FormControl} from "@angular/forms";
import {filter, map, switchMap} from "rxjs/operators";
import {LatLngExpression, Layer, Polyline} from "leaflet";

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
    startWith([]),
  )

  public routeResponse$ = new BehaviorSubject<RouteResponse>([])


  constructor(
    private _http: HttpClient
  ) {
  }

  getLocations(value: string): Observable<Location[]> {
    const request$ = this._http.get(`${environment.apiUrl}locations?search=${value}`) as Observable<Location[]>
    return request$.pipe(catchError(() => of([])))
  }

  vrp_solve() {
    this.pickedLocations$.pipe(
      switchMap((locations) => {
          const depot = 'depot=0'
          const num_vehicles = 'num_vehicles=2'
          const place_ids = locations.map(l => `place_id=${l.place_id}`).join('&')
          return this._http.get(`${environment.apiUrl}vrp_solve?${depot}&${num_vehicles}&${place_ids}`) as Observable<RouteResponse>
        }
      )).subscribe((routeResponse) => this.routeResponse$.next(routeResponse))
  }

}
