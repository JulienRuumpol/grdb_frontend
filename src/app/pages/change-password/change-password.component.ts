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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatError,
    MatSpinner,
    MatFormField,
    MatInputModule,
    TranslateModule,
    MatError
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changeError: boolean = false
  isSaving: boolean = false
  private _snackBar = inject(MatSnackBar);
  isNewPasswordPresent: Boolean = false
  isOldPasswordPresent: Boolean = false
  isNewPasswordConfirmationPresent: Boolean = false

  //checks if new password is the same
  isNewPasswordConfirmationValid: Boolean = false

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

    if (this.areErrorsPresent()) return
    this.changeError = false
    this.isSaving = true

    let changePasswordInfo: ChangePassword = {
      oldPassword: this.changePasswordForm.controls.oldPassword.value || '',
      newPassword: this.changePasswordForm.controls.newPassword.value || '',
    }

    let userId = this.authService.getStoredUserInformation().id

    this.userService.changeUserPassword(userId, changePasswordInfo).subscribe({
      next: (v) => {
        this.openSaveSuccesSnackbar()
      },
      error: (e) => {
        console.log('error at changing password ' + JSON.stringify(e))
        this.changeError = true
        this.isSaving = false

      },
      complete: () => {
        this.isSaving = false
      }
    })
  }
  openSaveSuccesSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 500000
    })
  }

  removeInputErrors() {
    this.isOldPasswordPresent = false
    this.isNewPasswordPresent = false;
    this.isNewPasswordConfirmationPresent = false
    this.isNewPasswordConfirmationValid = false;
  }


  areErrorsPresent(): Boolean {
    this.removeInputErrors();
    let errorPresent: Boolean = false;
    if (!this.changePasswordForm.controls.oldPassword.valid) {
      this.isOldPasswordPresent = true;
      errorPresent = true
    }
    if (!this.changePasswordForm.controls.newPassword.valid) {
      this.isNewPasswordPresent = true;
      errorPresent = true
    }
    if (!this.changePasswordForm.controls.newPasswordConfirmation.valid) {
      this.isNewPasswordConfirmationPresent = true;
      errorPresent = true

    }

    if (!this.isNewPasswordConfirmationPresent && this.changePasswordForm.controls.newPassword.value !== this.changePasswordForm.controls.newPasswordConfirmation.value) {
      this.isNewPasswordConfirmationValid = true
      errorPresent = true

    }

    return errorPresent;
  }
}
