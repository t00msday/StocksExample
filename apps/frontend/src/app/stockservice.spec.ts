import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';

describe('Stockservice', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
