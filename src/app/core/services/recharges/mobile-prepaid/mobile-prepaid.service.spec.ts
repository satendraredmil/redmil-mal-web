import { TestBed } from '@angular/core/testing';

import { MobilePrepaidService } from './mobile-prepaid.service';

describe('MobilePrepaidService', () => {
  let service: MobilePrepaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilePrepaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
