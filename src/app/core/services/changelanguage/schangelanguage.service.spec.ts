import { TestBed } from '@angular/core/testing';

import { SchangelanguageService } from './schangelanguage.service';

describe('SchangelanguageService', () => {
  let service: SchangelanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchangelanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
