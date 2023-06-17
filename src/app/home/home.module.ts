import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {ClickStopPropagationDirective} from "../shared/click-stop-propagation.directive";
import {ClickPreventDefaultDirective} from "../shared/click-prevent-default.directive";
import {HomeComponent} from './home.component';
import {MainMapComponent} from "./main-map/main-map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HomeService} from "./services/home.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {LocationsService} from "./services/locations.service";
import {MatChipsModule} from "@angular/material/chips";
import {LocationSearchComponent} from "./dashboard/locations-search/locations-search.component";
import {LocationsListComponent} from "./dashboard/locations-list/locations-list.component";
import {MatSliderModule} from "@angular/material/slider";
import {LocationsTypesComponent} from "./dashboard/locations-types/locations-types.component";


@NgModule({
  declarations: [
    MainMapComponent,
    HomeComponent,
    ClickStopPropagationDirective,
    ClickPreventDefaultDirective,
    DashboardComponent,
    LocationSearchComponent,
    LocationsListComponent,
    LocationsTypesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
    MatStepperModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSliderModule,
    FormsModule,
  ],
  providers: [
    HomeService,
    LocationsService
  ]
})
export class HomeModule {
}
