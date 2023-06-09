import {Injectable} from '@angular/core';
import {ResourceService} from "../services/resource.service";
import {DataSource} from "../services/dataSource";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";
import {HomeModule} from "./home.module";
import {Subject} from "rxjs";
import {LeafletMouseEvent} from "leaflet";


@Injectable()
export class HomeService {


  constructor(
    private _resourceService: ResourceService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) {

  }




}
