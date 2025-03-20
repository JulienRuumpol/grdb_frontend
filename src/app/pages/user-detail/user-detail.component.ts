import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Role } from '../../models/role.model';
import { UpdateUserDetails } from '../../models/update-user-detail.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatSpinner,
    MatLabel,
    MatIcon,
    TranslateModule,
    MatError
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  isAlreadyExistingEmail: boolean = false
  isInvalidEmail: boolean = false
  formIsInvalid: boolean = false
  isSaving: boolean = false
  user: User | undefined;
  userRole: Role | undefined;
  userInfoForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.required
    ]),
    username: new FormControl<string>('', [
      Validators.required
    ]),
    firstname: new FormControl<string>('', [
      Validators.required
    ]),
    lastname: new FormControl<string>('',
      Validators.required
    ),
    role: new FormControl<string>({ value: '', disabled: true })
  })

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let userId = this.authService.getStoredUserInformation().id

    if (userId) {
      this.userService.getUserById(userId).subscribe(response => {
        this.user = response

        this.userInfoForm.patchValue({
          email: this.user.email,
          username: this.user.username,
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          role: this.user.role.name
        })
      })

    }
  }

  navToChangePasswordPage() {
    this.router.navigate(['changePassword'])
  }

  saveUserDetails() {
    let userId = this.authService.getStoredUserInformation().id
    this.resetFormErrors()
    if (this.userInfoForm.valid) {
      this.isSaving = true
      let updatedUserDetails: UpdateUserDetails = {
        username: this.userInfoForm.controls.username.value || '',
        email: this.userInfoForm.controls.email.value || '',
        firstname: this.userInfoForm.controls.firstname.value || '',
        lastname: this.userInfoForm.controls.lastname.value || ''
      }

      this.userService.updateUserDetails(userId, updatedUserDetails).subscribe({
        next: (v) => {
          this.openSaveSuccesSnackbar()

        },
        error: (e) => {
          console.log('error at user-detail page updating userdetails ' + JSON.stringify(e))
          this.isSaving = false

          if (e.status === 409) {
            this.isAlreadyExistingEmail = true
            this.userInfoForm.controls.email.markAsTouched
          }
        },
        complete: () => {
          this.isSaving = false
        }
      })
    } else {
      this.formIsInvalid = true
      if (!this.userInfoForm.controls.email.valid) {
        this.isInvalidEmail = true
      }
    }



  }
  openSaveSuccesSnackbar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    })
  }

  resetFormErrors() {
    this.formIsInvalid = false;
    this.isInvalidEmail = false;
    this.isAlreadyExistingEmail = false;
  }

}
