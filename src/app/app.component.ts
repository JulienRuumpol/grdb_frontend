import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "./components/navbar/navbar-component";
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule, TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatIconModule, NavBarComponent, MatDialogModule,
    NgxMatSelectSearchModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true

})
export class AppComponent {
  title = 'grdb_frontend';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['nl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || "en");


  }
}
