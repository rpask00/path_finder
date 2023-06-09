import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
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
import {HomeComponent} from './home.component';
import {MainMapComponent} from "./main-map/main-map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HomeService} from "./home.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {PointInputComponent} from './dashboard/point-input/point-input.component';
import {MatStepperModule} from "@angular/material/stepper";
import {PointService} from "../services/point.service";
import { PointListComponent } from './dashboard/point-list/point-list.component';


@NgModule({
  declarations: [
    MainMapComponent,
    HomeComponent,
    ClickStopPropagationDirective,
    ClickPreventDefaultDirective,
    DashboardComponent,
    PointInputComponent,
    PointListComponent,
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
  ],
  providers: [
    HomeService,
    PointService
  ]
})
export class HomeModule {
}
