import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,  MatTabsModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'frontend';
}
