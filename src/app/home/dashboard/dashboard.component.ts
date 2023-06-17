import {Component} from '@angular/core';
import {LocationsService} from "../services/locations.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  readonly loading$ = this.locationsService.loading$;

  constructor(
    private locationsService: LocationsService
  ) {
  }

  async submit() {
    this.locationsService.vrp_solve()
  }


}
