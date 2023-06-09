import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <section class="container-fluid" style="position: relative">
          <div class="row">
              <div class="col-12 col-xxl-5">
                <app-dashboard></app-dashboard>
              </div>
              <div class="col-12 col-xxl-7">
                  <app-home-map></app-home-map>
              </div>
          </div>
      </section>
  `
})
export class HomeComponent {
}
