import {Component} from '@angular/core';
import {PointListService} from "./point-list.service";
import {Point} from "../../../services/point.service";
import {expand, Observable} from "rxjs";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss'],
  providers: [PointListService]
})
export class PointListComponent {


  displayedColumns = [
    'name',
    'lat',
    'lon',
  ]

  get dataSource$(): Observable<Point[]> {
    return this._pointListService.data$
  }

  get loading$(): Observable<boolean> {
    return this._pointListService.loading$
  }

  get totalItems$(): Observable<number> {
    return this._pointListService.totalItems$
  }

  get pageIndex(): number {
    return this._pointListService.pager$.value.page
  }

  get expandedElement$(): Observable<Point | null> {
    return this._pointListService.expandedElement$
  }

  constructor(
    private _pointListService: PointListService
  ) {
  }


  protected readonly expand = expand;

  onPageChange(page: PageEvent) {
    this._pointListService.pager$.next({
      page: page.pageIndex,
      size: page.pageSize
    })
  }




}
