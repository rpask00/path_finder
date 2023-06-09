import {Component, OnInit} from '@angular/core';
import {latLng, LeafletMouseEvent, tileLayer} from "leaflet";
import {PointService} from "../../services/point.service";


@Component({
  selector: 'app-home-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {

  constructor(
    private _pointService: PointService,
  ) {
  }

  options = {
    layers: [
      tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {maxZoom: 18,})
    ],
    zoom: 6,
    center: latLng(50, 19)
  };

  ngOnInit(): void {
  }

  onMapClick($event: LeafletMouseEvent) {
    this._pointService.leafletMouseEvent$.next($event);
  }
}
