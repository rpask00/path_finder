import {Component, OnInit} from '@angular/core';
import {latLng, Layer, LeafletMouseEvent, Marker, tileLayer} from "leaflet";
import {LocationsService} from "../services/locations.service";
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


  markers$: Observable<Layer[]> = this._locationsService.pickedLocations$.pipe(
    map((locations) => locations.map((location) => new Marker([1, 3], {}).bindPopup(`
          <p>Comment: <b>${location.description}</b></p>`
      ).setIcon(iconDefault)
    ))
  )

  ngOnInit(): void {
    this._locationsService.pickedLocations$.subscribe(console.log)
  }

  onMapClick($event: LeafletMouseEvent) {
  }
}
