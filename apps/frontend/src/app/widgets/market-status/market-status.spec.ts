import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStatus } from './market-status';
import {provideHttpClient} from '@angular/common/http';

describe('MarketStatus', () => {
  let component: MarketStatus;
  let fixture: ComponentFixture<MarketStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketStatus],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
