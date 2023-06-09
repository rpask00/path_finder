import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {LeafletMouseEvent} from "leaflet";
import {ResourceService} from "./resource.service";

export interface Point {
  name: string;
  lon: number;
  lat: number;
}

@Injectable()
export class PointService {
  leafletMouseEvent$ = new Subject<LeafletMouseEvent>();

  constructor(
    private resourceService: ResourceService
  ) {
  }

  addPoint(point: Point) {
    this.resourceService.create('points', point).subscribe();
  }
}
