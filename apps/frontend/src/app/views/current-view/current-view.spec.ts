import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentView } from './current-view';
import {provideHttpClient} from '@angular/common/http';

describe('CurrentView', () => {
  let component: CurrentView;
  let fixture: ComponentFixture<CurrentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentView],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
