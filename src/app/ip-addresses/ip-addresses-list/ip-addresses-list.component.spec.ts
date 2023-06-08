import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressesListComponent } from './ip-addresses-list.component';

describe('IpAddressesListComponent', () => {
  let component: IpAddressesListComponent;
  let fixture: ComponentFixture<IpAddressesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpAddressesListComponent]
    });
    fixture = TestBed.createComponent(IpAddressesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
