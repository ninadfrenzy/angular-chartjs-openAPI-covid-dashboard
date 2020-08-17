import { TestBed } from '@angular/core/testing';

import { HttpCovidService } from './http-covid.service';

describe('HttpCovidService', () => {
  let service: HttpCovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
