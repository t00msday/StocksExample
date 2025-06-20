import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {CurrentView} from './views/current-view/current-view';
import {provideHttpClient} from '@angular/common/http';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterModule.forRoot(
        [{path: '', component: CurrentView}, {path: 'simple', component: CurrentView}]
      )],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Stockprice Monitor');
  });
});
