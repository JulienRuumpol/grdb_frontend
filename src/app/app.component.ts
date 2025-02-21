import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "./components/navbar/navbar-component";
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatIconModule, NavBarComponent, MatDialogModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'grdb_frontend';
}
