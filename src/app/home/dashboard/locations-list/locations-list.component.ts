import {Component, OnInit} from '@angular/core';
import {ILocation, LocationsService} from "../../services/locations.service";
import {DestroyerComponent} from "../../../shared/destroyer.component";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent extends DestroyerComponent implements OnInit {
  public removedLocation$: Subject<ILocation> = this.locationsService.removedLocation$;
  public pickedLocations$: Observable<ILocation[]> = this.locationsService.pickedLocations$;


  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit() {
  }

}
