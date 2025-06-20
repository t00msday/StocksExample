import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';
import {provideHttpClient} from '@angular/common/http';

describe('Stockservice', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
