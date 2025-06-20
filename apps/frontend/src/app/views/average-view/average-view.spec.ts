import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageView } from './average-view';
import {provideHttpClient} from '@angular/common/http';

describe('AverageView', () => {
  let component: AverageView;
  let fixture: ComponentFixture<AverageView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageView],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
