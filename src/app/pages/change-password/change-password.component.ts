import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { ChangePassword } from '../../models/changePassword.model';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-change-password',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatError,
    MatSpinner,
    MatFormField,
    MatInputModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isSaving: boolean = false
  private _snackBar = inject(MatSnackBar);

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl<string>('', [
      Validators.required
    ]),
    newPassword: new FormControl<string>('',
      [
        Validators.required
      ]
    ),
    newPasswordConfirmation: new FormControl<string>('',
      Validators.required
    )
  })

  constructor(private userService: UserService, private authService: AuthService, public snackBar: MatSnackBar) { }


  ChangePassword() {

    this.isSaving = true

    let changePasswordInfo: ChangePassword = {
      oldPassword: this.changePasswordForm.controls.oldPassword.value || '',
      newPassword: this.changePasswordForm.controls.oldPassword.value || '',
      newPasswordConfirmation: this.changePasswordForm.controls.oldPassword.value || ''
    }

    let userId = this.authService.getStoredUserInformation().id

    this.userService.changeUserPassword(2, changePasswordInfo).subscribe({
      next: (v) => {
        this.isSaving = false
        this.openSaveSuccesSnackbar()

      },
      error: (e) => {
        this.isSaving = false
      },
      complete: () => {
        this.isSaving = false
      }
    })
  }
  openSaveSuccesSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    })
  }
}
