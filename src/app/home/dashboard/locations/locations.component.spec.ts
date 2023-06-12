import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: LocationSearchComponent;
  let fixture: ComponentFixture<LocationSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationSearchComponent]
    });
    fixture = TestBed.createComponent(LocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
