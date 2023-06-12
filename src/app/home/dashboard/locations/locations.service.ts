import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Location} from "./locations.component";

@Injectable()
export class LocationsService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getLocations(value: string) {
    return this._http.get(`${environment.apiUrl}locations?search=${value}`) as Observable<Location[]>
  }
}
