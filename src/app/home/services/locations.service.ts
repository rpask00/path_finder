import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {debounceTime, map, merge, Observable, of, scan, shareReplay, startWith, Subject, tap} from "rxjs";
import {Location} from "../dashboard/locations/locations.component";
import {FormControl} from "@angular/forms";
import {filter, switchMap} from "rxjs/operators";

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


  constructor(
    private _http: HttpClient
  ) {
  }

  getLocations(value: string) {
    return this._http.get(`${environment.apiUrl}locations?search=${value}`) as Observable<Location[]>
  }

   searchPath() {
    return this.pickedLocations$.pipe(
      switchMap(locations => {
        // const location = locations[0];
        // if (!location) return of(null);
        return this._http.get(`${environment.apiUrl}places_details/` + locations[0].place_id)
      })
    )
  }
}
