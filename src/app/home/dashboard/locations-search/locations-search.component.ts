import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DestroyerComponent} from "../../../shared/destroyer.component";
import {ILocation, LocationsService} from "../../services/locations.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-location-search',
  templateUrl: './locations-search.component.html',
  styleUrls: ['./locations-search.component.scss']
})
export class LocationSearchComponent extends DestroyerComponent implements OnInit {
  public searchControl: FormControl<any> = this.locationsService.searchControl;
  public locations$: Observable<ILocation[]> = this.locationsService.locations$;

  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit() {
  }

  displayFn(locations?: ILocation[], location?: ILocation) {
    return location?.description || '';
  }
}
