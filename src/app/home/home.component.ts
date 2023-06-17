import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <section class="container-fluid w-100">
          <div class="dashboard-container">
              <app-dashboard></app-dashboard>
          </div>
          <div class="map-container">
              <app-home-map></app-home-map>
          </div>
      </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}
