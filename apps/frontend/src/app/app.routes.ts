import { Routes } from '@angular/router';
import {CurrentView} from './views/current-view/current-view';
import {AverageView} from './views/average-view/average-view';

export const routes: Routes = [
  { path: '', redirectTo: '/current', pathMatch: 'full' },
  {path: "current" , component: CurrentView },
  {path: "average", component: AverageView}
];
