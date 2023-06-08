import {Component} from '@angular/core';

@Component({
  selector: 'app-ip-addresses',
  template: `
      <section class="container-fluid" style="position: relative">
          <div class="row">
              <div class="col-12 col-xxl-5">
                  <app-ip-addresses-list></app-ip-addresses-list>
              </div>
              <div class="col-12 col-xxl-7">
                  <app-ip-addresses-map></app-ip-addresses-map>
              </div>
          </div>
      </section>
  `
})
export class IpAddressesComponent {
}
