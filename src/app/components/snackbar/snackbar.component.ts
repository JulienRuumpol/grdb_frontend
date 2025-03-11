import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarLabel, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar',
  imports: [MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarModule,
    TranslateModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

}
