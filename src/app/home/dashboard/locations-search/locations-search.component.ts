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
  public removedLocation$: Subject<ILocation> = this.locationsService.removedLocation$;
  public pickedLocations$: Observable<ILocation[]> = this.locationsService.pickedLocations$;

  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit() {
    this.pickedLocations$.subscribe(console.log)
  }

  displayFn(locations?: ILocation[], location?: ILocation) {
    return location?.description || '';
  }

  async submit() {
    this.locationsService.vrp_solve()
  }
}
