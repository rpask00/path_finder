import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IpAddressesRoutingModule} from "./ip-addresses-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {ClickStopPropagationDirective} from "../shared/click-stop-propagation.directive";
import {ClickPreventDefaultDirective} from "../shared/click-prevent-default.directive";
import {IpAddressesComponent} from './ip-addresses.component';
import {IpAddressesListComponent} from "./ip-addresses-list/ip-addresses-list.component";
import {IpAddressesService} from "./ip-addresses.service";
import {IpAddressesMapComponent} from "./ip-addresses-map/ip-addresses-map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";


@NgModule({
  declarations: [
    IpAddressesListComponent,
    IpAddressesMapComponent,
    IpAddressesComponent,
    ClickStopPropagationDirective,
    ClickPreventDefaultDirective,
  ],
  imports: [
    CommonModule,
    IpAddressesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    LeafletModule,
    MatIconModule,
    MatSortModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
  ],
  providers: [IpAddressesService],
})
export class IpAddressesModule {
}
