import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stockchart } from './stockchart';

describe('Stockchart', () => {
  let component: Stockchart;
  let fixture: ComponentFixture<Stockchart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stockchart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stockchart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
