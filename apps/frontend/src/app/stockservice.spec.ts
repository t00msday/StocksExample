import { TestBed } from '@angular/core/testing';

import { Stockservice } from './stockservice';

describe('Stockservice', () => {
  let service: Stockservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stockservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
