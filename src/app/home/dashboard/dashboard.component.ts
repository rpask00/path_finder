import {Component} from '@angular/core';
import {LocationsService} from "../services/locations.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public num_vehicles = 0;
  readonly loading$ = this.locationsService.loading$;

  constructor(
    private locationsService: LocationsService
  ) {
  }

  async submit() {
    this.locationsService.vrp_solve(this.num_vehicles)
  }


}
