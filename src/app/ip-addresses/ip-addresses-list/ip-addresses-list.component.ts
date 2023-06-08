import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {Filter} from "../../services/resource.service";
import {IpAddress, IpAddressesService} from "../ip-addresses.service";
import {DestroyerComponent} from "../../shared/destroyer.component";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-ip-addresses-list',
  templateUrl: './ip-addresses-list.component.html',
  styleUrls: ['./ip-addresses-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IpAddressesListComponent extends DestroyerComponent implements OnInit {
  filtersForm = new FormGroup({
    ip: new FormControl('', {nonNullable: true,}),
    comment: new FormControl('', {nonNullable: true,}),
  })

  ipAddressEditForm = this.ipAddressesService.buildIpAddressesForm()
  ipAddressCreateForm = this.ipAddressesService.buildIpAddressesForm()


  displayedColumns = [
    'ip',
    'comment',
    'mbps',
    'pps',
    'actions',
  ]


  get dataSource$(): Observable<IpAddress[]> {
    return this.ipAddressesService.data$
  }

  get loading$(): Observable<boolean> {
    return this.ipAddressesService.loading$
  }

  get totalItems$(): Observable<number> {
    return this.ipAddressesService.totalItems$
  }

  get pageIndex(): number {
    return this.ipAddressesService.pager$.value.page
  }

  get expandedElement$(): Observable<IpAddress | null> {
    return this.ipAddressesService.expandedElement$
  }

  constructor(
    private ipAddressesService: IpAddressesService
  ) {
    super();
  }

  ngOnInit() {
    this.ipAddressesService.connect()

    this.expandedElement$.pipe(takeUntil(this.destroyed$)).subscribe((ipAddress) => {
        if (ipAddress) {
          this.ipAddressEditForm.patchValue(ipAddress)
        }
      }
    )
  }


  onPageChange(page: PageEvent) {
    this.ipAddressesService.pager$.next({
      page: page.pageIndex,
      size: page.pageSize
    })
  }


  onSortChange(sort: Sort) {
    if (sort.active && sort.direction) {
      this.ipAddressesService.sorters$.next({[sort.active]: sort.direction})
    } else {
      this.ipAddressesService.sorters$.next({})
    }
  }

  onFilterChange() {
    const filters: Filter = this.filtersForm.value

    for (const key in filters) {
      if (!filters[key]) {
        delete filters[key]
      }
    }
    this.ipAddressesService.filters$.next(filters)
  }

  submitForm(_id: string) {
    if (_id) {
      this.ipAddressesService.updateIpAddress(_id, this.ipAddressEditForm.value as Partial<IpAddress>)
    } else {
      this.ipAddressesService.createIpAddress(this.ipAddressCreateForm.value as Partial<IpAddress>)
    }
  }

  deleteIpAddress(_id: string) {
    this.ipAddressesService.deleteIpAddress(_id)
  }

  expand(ipAddress: IpAddress | null) {
    this.ipAddressesService.expand(ipAddress)
  }


  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ipAddressesService.disconnect()
  }
}
