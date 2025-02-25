import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarModule,
    MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

}
