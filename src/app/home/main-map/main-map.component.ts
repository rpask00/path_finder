import {Component, OnInit} from '@angular/core';
import {latLng, Layer, LeafletMouseEvent, Marker, tileLayer} from "leaflet";
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
          <h5>IP Address: <b>${ld.name}</b></h5>
          <p>Comment: <b>${ld.formatted_address}</b></p>`
      ).setIcon(iconDefault)
    ))
  )

  ngOnInit(): void {
    this._locationsService.mapPoints$.subscribe(l => console.log(l))
  }

  onMapClick($event: LeafletMouseEvent) {
  }
}
