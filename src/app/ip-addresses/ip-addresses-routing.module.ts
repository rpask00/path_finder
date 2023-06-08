import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IpAddressesComponent} from "./ip-addresses.component";

const routes: Routes = [{
  path: '',
  component: IpAddressesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpAddressesRoutingModule {
}
