import {Injectable} from '@angular/core';
import {ResourceService} from "../services/resource.service";
import {DataSource} from "../services/dataSource";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";

const IP_ADDRESS_PATTERN: RegExp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export interface IpAddress {
  _id?: string;
  ip: string;
  lat: number;
  lon: number;
  comment: string;
  mbps: number;
  pps: number;
}

@Injectable()
export class IpAddressesService extends DataSource<IpAddress> {
  resource = 'ip_addresses';

  constructor(
    private _resourceService: ResourceService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) {
    super();
  }

  expand(ipAddress: IpAddress | null) {
    this._expandedElement$.next(this._expandedElement$.value === ipAddress ? null : ipAddress);
  }

  override loadData() {
    const pager = this.pager$.getValue();
    const sorters = this.sorters$.getValue();
    const filters = this.filters$.getValue();

    this._loading$.next(true);
    this._resourceService.get<IpAddress>(this.resource, pager, sorters, filters).subscribe({
      next: (response) => {
        this._loading$.next(false);
        this._data$.next(response.data);
        this._totalItems$.next(response.totalItems);
      },
      error: () => this._loading$.next(false)
    });

    return this;
  }

  buildIpAddressesForm() {
    return this._fb.nonNullable.group({
      ip: ['', [Validators.required, Validators.pattern(IP_ADDRESS_PATTERN)]],
      comment: [''],
      mbps: [0, [Validators.required, Validators.min(0)]],
      lat: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
      pps: [0, [Validators.required, Validators.min(0)]],
    });

  }

  updateIpAddress(_id: string, value: Partial<IpAddress>) {
    this._resourceService.put<IpAddress>(this.resource, _id, value).subscribe({
      next: () => {
        this.loadData()
        this._toastr.success('Ip address updated');
      },
      error: (error) => this._toastr.error(error?.error || 'Error while updating ip address')
    })
  }

  deleteIpAddress(_id: string) {
    this._resourceService.delete(this.resource, _id).subscribe({
      next: () => {
        this.loadData()
        this._toastr.success('Ip address deleted');
      },
      error: (error) => this._toastr.error(error?.error || 'Error while deleting ip address')
    })
  }

  createIpAddress(value: Partial<IpAddress>) {
    this._resourceService.create<IpAddress>(this.resource, value).subscribe({
      next: () => {
        this.loadData()
        this._toastr.success('Ip address created');
      },
      error: (error) => this._toastr.error(error?.error || 'Error while creating ip address')
    })
  }
}
