import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsTypesComponent } from './locations-types.component';

describe('LocationsTypesComponent', () => {
  let component: LocationsTypesComponent;
  let fixture: ComponentFixture<LocationsTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsTypesComponent]
    });
    fixture = TestBed.createComponent(LocationsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
