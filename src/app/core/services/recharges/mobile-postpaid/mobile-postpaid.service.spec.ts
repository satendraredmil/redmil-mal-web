import { TestBed } from '@angular/core/testing';

import { MobilePostpaidService } from './mobile-postpaid.service';

describe('MobilePostpaidService', () => {
  let service: MobilePostpaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilePostpaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
