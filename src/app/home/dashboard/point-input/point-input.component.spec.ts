import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInputComponent } from './point-input.component';

describe('PointInputComponent', () => {
  let component: PointInputComponent;
  let fixture: ComponentFixture<PointInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointInputComponent]
    });
    fixture = TestBed.createComponent(PointInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
