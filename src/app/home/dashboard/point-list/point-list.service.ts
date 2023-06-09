import { Injectable } from '@angular/core';
import {DataSource} from "../../../services/dataSource";
import {Point} from "../../../services/point.service";
import {PointListComponent} from "./point-list.component";

@Injectable()
export class PointListService extends DataSource<Point>{

  constructor() {
    super();
  }

  loadData(): DataSource<Point> {
    throw new Error('Method not implemented.');
  }
}
