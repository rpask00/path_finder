import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Point, PointService} from "../../../services/point.service";

@Component({
  selector: 'app-point-input',
  templateUrl: './point-input.component.html',
  styleUrls: ['./point-input.component.scss']
})
export class PointInputComponent {


  newPointForm = this._formBuilder.group({
    lat: [0, Validators.required],
    lon: [0, Validators.required],
    name: ['', Validators.required],

  });
  mouseClickListener?: Subscription;
  constructor(private _formBuilder: FormBuilder,
              private _pointService: PointService
  ) {
  }

  listenerForMapClick() {
    this.mouseClickListener = this._pointService.leafletMouseEvent$.subscribe((event) => {
      this.newPointForm.patchValue({
        lat: event.latlng.lat,
        lon: event.latlng.lng
      });

      this.mouseClickListener?.unsubscribe();
    });
  }

  cancelMapCLickListener() {
    if(this.mouseClickListener) {
      this.mouseClickListener.unsubscribe();
    }
  }

  savePoint() {
    const point = this.newPointForm.getRawValue() as Point;
    this._pointService.addPoint(point);
    this.newPointForm.reset();
  }
}
