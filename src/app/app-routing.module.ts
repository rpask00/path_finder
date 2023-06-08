import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: 'ip-addresses',
  loadChildren: () => import('./ip-addresses/ip-addresses.module').then(m => m.IpAddressesModule)
}, {
  path: '',
  redirectTo: 'ip-addresses',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
