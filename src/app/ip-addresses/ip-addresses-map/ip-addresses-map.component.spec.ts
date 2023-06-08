import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressesMapComponent } from './ip-addresses-map.component';

describe('IpAddressesMapComponent', () => {
  let component: IpAddressesMapComponent;
  let fixture: ComponentFixture<IpAddressesMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpAddressesMapComponent]
    });
    fixture = TestBed.createComponent(IpAddressesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
