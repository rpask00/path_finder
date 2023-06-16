import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DestroyerComponent} from "../../../shared/destroyer.component";
import {LocationsService} from "../../services/locations.service";
import {FormControl} from "@angular/forms";

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
  public searchControl: FormControl<any> = this.locationsService.searchControl;
  public locations$: Observable<Location[]> = this.locationsService.locations$;
  public removedLocation$: Subject<Location> = this.locationsService.removedLocation$;
  public pickedLocations$: Observable<Location[]> = this.locationsService.pickedLocations$;

  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit() {
    this.pickedLocations$.subscribe(console.log)
  }

  displayFn(locations?: Location[], location?: Location) {
    return location?.description || '';
  }

  async submit() {
    this.locationsService.vrp_solve()
  }
}
