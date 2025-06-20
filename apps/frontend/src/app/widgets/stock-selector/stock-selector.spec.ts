import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSelector } from './stock-selector';
import {provideHttpClient} from '@angular/common/http';

describe('StockSelector', () => {
  let component: StockSelector;
  let fixture: ComponentFixture<StockSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSelector],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
