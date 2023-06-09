import { TestBed } from '@angular/core/testing';

import { PointListService } from './point-list.service';

describe('PointListService', () => {
  let service: PointListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
