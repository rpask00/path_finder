import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {LeafletMouseEvent} from "leaflet";

export interface Point {
  name: string;
  lon: number;
  lat: number;
}

@Injectable()
export class PointService {
  leafletMouseEvent$ = new Subject<LeafletMouseEvent>();

  constructor() { }

  addPoint(point: Point) {
    console.log(point)
  }
}
