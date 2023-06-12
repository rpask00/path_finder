import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, map, Observable, startWith, switchMap} from "rxjs";
import {DestroyerComponent} from "../../../shared/destroyer.component";
import {LocationsService} from "./locations.service";

export interface Location {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
}

@Component({
  selector: 'app-location-search',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationSearchComponent extends DestroyerComponent implements OnInit {
  public searchControl = new FormControl();
  public locations$: Observable<Location[]> = this.searchControl.valueChanges.pipe(
    startWith([]),
    debounceTime(500),
    switchMap((value) => this.locationsService.getLocations(value)),
  )


  constructor(
    private locationsService: LocationsService
  ) {
    super();
  }

  ngOnInit() {
  }

  displayFn(locations?: Location[], value?: string) {
    return locations?.find(location => location.place_id === value)?.description || '';
  }
}
