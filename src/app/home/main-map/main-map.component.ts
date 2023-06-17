import {Component, OnInit} from '@angular/core';
import {latLng, Layer, LeafletMouseEvent, Marker, Polyline, tileLayer} from "leaflet";
import {LocationDetail, LocationsService} from "../services/locations.service";
import {map, Observable} from "rxjs";
import {iconDefault} from "../../shared/markerIcons";


@Component({
  selector: 'app-home-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  constructor(
    private _locationsService: LocationsService,
  ) {
  }

  options = {
    layers: [
      tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {maxZoom: 18,})
    ],
    zoom: 6,
    center: latLng(50, 19)
  };


  public markers$: Observable<Layer[]> = this._locationsService.mapPoints$.pipe(
    map((locationDetails) => locationDetails.map((ld: LocationDetail) => new Marker([ld.geometry.location.lat, ld.geometry.location.lng], {}).bindPopup(`
          <h5><b>${ld.name}</b></h5>
          <p><b>${ld.formatted_address}</b></p>`
      ).setIcon(iconDefault)
    ))
  )

  public mapRoutes$: Observable<Layer[]> = this._locationsService.routeResponse$.asObservable().pipe(
    map((routeResponse) => {
      const vehicle_count = routeResponse.reduce((acc, {vehicle_id}) => Math.max(acc, vehicle_id), 0) + 1
      const randomColors = new Array(vehicle_count).fill(0).map(() => Math.floor(Math.random() * 16777215).toString(16));
      return routeResponse.map(({waypoints, vehicle_id}) => {
        const color = `#${randomColors[vehicle_id]}`
        return new Polyline(waypoints, {color})
      });
    }),
  )

  ngOnInit(): void {

  }

  onMapClick($event: LeafletMouseEvent) {
  }
}
