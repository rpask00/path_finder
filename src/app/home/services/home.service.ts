import {Injectable} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";


@Injectable()
export class HomeService {


  constructor(
    private _resourceService: ResourceService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) {

  }




}
