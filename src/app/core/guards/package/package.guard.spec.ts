import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { packageGuard } from './package.guard';

describe('packageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => packageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
