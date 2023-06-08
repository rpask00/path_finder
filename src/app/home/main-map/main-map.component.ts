import {Component, OnInit} from '@angular/core';
import {latLng, Layer, Marker, tileLayer} from "leaflet";
import {IpAddress, HomeService} from "../home.service";
import {combineLatest, map, Observable} from "rxjs";
import {iconActive, iconDefault} from "../../shared/markerIcons";


@Component({
  selector: 'app-home-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
  constructor(
    private ipAddressesService: HomeService,
  ) {
  }
  options = {
    layers: [
      tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {maxZoom: 18,})
    ],
    zoom: 6,
    center: latLng(50, 19)
  };


  markers$: Observable<Layer[]> = combineLatest([this.ipAddressesService.data$, this.ipAddressesService.expandedElement$]).pipe(
    map(([data, expandedElement]) => data.map((element: IpAddress) => new Marker([element.lat, element.lon], {}).bindPopup(`
          <h5>IP Address: <b>${element.ip}</b></h5>
          <p>Comment: <b>${element.comment}</b></p>
          <p>mbps: <b>${element.mbps}</b></p>
          <p>pps: <b>${element.pps}</b></p>`
      ).setIcon(expandedElement?._id == element._id ? iconActive : iconDefault)
    ))
  )

  ngOnInit(): void {
  }

}
