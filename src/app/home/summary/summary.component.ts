import {Component} from '@angular/core';
import {ILocation, LocationDetail, LocationsService} from "../services/locations.service";
import {map, Observable, switchMap} from "rxjs";

export interface RouteSummary {
  vehicle_id: number,
  vehicle_color: string,
  segments: ILocation[]
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  readonly routeSummaries$: Observable<RouteSummary[]> = this._locationsService.routeResponse$.pipe(
    switchMap((response) => {
      return this._locationsService.pickedLocations$.pipe(
        map((locations) => {

          const routes: RouteSummary[] = []


          for (let element of response) {
            if (!routes.find((route) => route.vehicle_id === element.vehicle_id)) {
              routes.push({
                vehicle_id: element.vehicle_id,
                vehicle_color: this._locationsService.driersColors[element.vehicle_id],
                segments: []
              })
            }
            const route = routes.find((route) => route.vehicle_id === element.vehicle_id)
            route?.segments.push(
              locations.find((point) => point.place_id === element.from)!,
            )
          }
          return routes;
        })
      )

    })
  );

  constructor(
    private _locationsService: LocationsService
  ) {
  }

}
