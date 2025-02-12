import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LeftNavBarComponent } from "./components/left-nav-bar/left-nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatIconModule, LeftNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'grdb_frontend';
}
