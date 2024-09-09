import { TestBed } from '@angular/core/testing';

import { AuthenticationapiService } from './authenticationapi.service';

describe('AuthenticationapiService', () => {
  let service: AuthenticationapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
