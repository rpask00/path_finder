import {Injectable} from '@angular/core';
import {DataSource} from "../../../services/dataSource";
import {Point} from "../../../services/point.service";
import {ResourceService} from "../../../services/resource.service";

@Injectable()
export class PointListService extends DataSource<Point> {
  resource = 'points';

  constructor(
    private _resourceService: ResourceService
  ) {
    super();
  }

  override loadData() {
    const pager = this.pager$.getValue();
    const sorters = this.sorters$.getValue();
    const filters = this.filters$.getValue();

    this._loading$.next(true);
    this._resourceService.get<Point>(this.resource, pager, sorters, filters).subscribe({
      next: (response) => {
        this._loading$.next(false);
        this._data$.next(response.data);
        this._totalItems$.next(response.totalItems);
      },
      error: () => this._loading$.next(false)
    });

    return this;
  }
}
